import React, { Component, useCallback } from 'react'
import { EditorState } from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import Dropzone from '../components/Dropzone';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { AuthContext } from "../contexts/AuthContext";
import { useLocation, useParams, withRouter } from 'react-router-dom';


class EditBook extends Component {

  static contextType = (AuthContext);
  constructor(props) {
    super(props)
    this.state = {
      "title": "ыва ываываыва",
      "description": "",
      "category": "clothess",
      "author": "einstein",
      "issuer": "Transworld",
      "quantity": 50,
      "imageUrl": "",
    }

    this.onEditorStateChange = (description) => {
      this.setState({
        description,
      });
    };
    this.onDropGallery = (files) => {
      files.map((file) => {
        var requestOptions = {
          method: 'POST',
          body: file,
          redirect: 'follow'
        };
        fetch("https://www.filestackapi.com/api/store/S3?key=AsPOvdHfS7OWcc6fZnBAQz", requestOptions)
          .then(response => response.json())
          .then(result => this.setState({ gallery: { "items": [...this.state.gallery.items, result.url] } }))
          .catch(error => console.log('error', error));
        return file;
      })
      // this.setState({ files })
    };


    this.onDropDocs = (files) => {
      files.map((file) => {
        var requestOptions = {
          method: 'POST',
          body: file,
          redirect: 'follow'
        };
        fetch("https://www.filestackapi.com/api/store/S3?key=AsPOvdHfS7OWcc6fZnBAQz", requestOptions)
          .then(response => response.json())
          .then(result => this.setState({ files: { "items": [...this.state.files.items, result.url] } }))
          .catch(error => console.log('error', error));
        return file;
      })
      // this.setState({ files })
    };
    this.onDropImage = (files) => {
      var requestOptions = {
        method: 'POST',
        body: files[0],
        redirect: 'follow'
      };
      fetch("https://www.filestackapi.com/api/store/S3?key=AsPOvdHfS7OWcc6fZnBAQz", requestOptions)
        .then(response => response.json())
        .then(result => this.setState({ imageUrl: result.url }))
        .catch(error => console.log('error', error));
      return files[0];
      
    };

    
    this.onChange = (stateName, event) => {
      this.setState({[stateName]: event.target.value})
    }

    this.submitBlock = (e)=>{
      e.preventDefault()
      const { id } = this.props.match.params;
      if (id) {
        this.context.patchBook(id, this.state)
      }
      else {
        this.context.postBook(this.state)
      }
    }

  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      console.log('dsadas')
      const {description, updatedAt, createdAt, ...book} = await this.context.getBook({bookId: id})
      this.setState(book)
    }
  }

  render() {
    return (
      <div>


        <div>
          <div>
            <form className="form" >
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label>Название</label>
                        <input className="form-control" type="text" name="name" placeholder="Название" value={this.state.title} onChange={(e) => this.onChange('title', e)} />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label>Категория</label>
                        <input className="form-control" type="text" name="category" placeholder="Категория" value={this.state.category} onChange={(e) => this.onChange('category', e)}/>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label>Автор</label>
                        <input className="form-control" type="text" name="author" placeholder="Автор" value={this.state.author} onChange={(e) => this.onChange('author', e)}/>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <div className="form-group">
                        <label>Издатель</label>
                        <input className="form-control" type="text" name="issuer" placeholder="Издатель" value={this.state.issuer} onChange={(e) => this.onChange('issuer', e)} />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label>Количество</label>
                        <input className="form-control" type="number" name="quantity" placeholder="Количество" value={this.state.quantity} onChange={(e) => this.onChange('quantity', e)}/>
                      </div>
                    </div>
                  </div>
                  <br />


                  <div className="row">
                    <div className="col-12 mb-3">
                      <div className="form-group">
                        <label>Описание</label>
                        
                        <div className="form-control" >
                          <Editor

                            localization={{
                              locale: 'ru',
                            }}
                            editorState={this.state.description}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-12 mb-3">
                      <div className="form-group">
                        <label>Главное изображение</label>
                        <Dropzone multiple={false} onDrop={this.onDropImage} accept={{ 'image/*': [] }} />
                        <div className="dropimages" style={{ display: 'flex' }}>
                          {
                            
                          this.state.imageUrl?.length?
                              <img src={this.state.imageUrl} width="200px" alt="" />
                          :
                          <></>
                          }
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col d-flex justify-content-start">
                  <button className="btn btn-primary" type="submit" onClick={this.submitBlock}>Сохранить</button>
                </div>
              </div>
            </form>

          </div>
        </div>


      </div>
    )
  }
}

export default withRouter(EditBook);
