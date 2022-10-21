import React, { Component, useCallback } from 'react'
import { EditorState } from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import Dropzone from '../components/Dropzone';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { AuthContext } from "../contexts/AuthContext";


export default class EditBook extends Component {

  static contextType = (AuthContext);
  constructor(props) {
    super(props)
    this.state = {
      "images":[],
      "title": "ыва ываываыва",
      "description": "",
      "category": "clothess",
      "imageUrl": "",
      
      "files": { "items": [] },
      "gallery": { "items": [] }
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

    this.submitBlock = ()=>{
      this.context.createBlock(this.state)
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
                        <input className="form-control" type="text" name="name" placeholder="Название" defaultValue={this.state.title} />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label>Категория</label>
                        <input className="form-control" type="text" name="username" placeholder="Категория" defaultValue={this.state.category} />
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
                        <label>Главное изооброжение</label>
                        <Dropzone multiple={false} onDrop={this.onDropImage} accept={{ 'image/*': [] }} />
                        <div className="dropimages" style={{ display: 'flex' }}>
                          {
                            
                          this.state.imageUrl.length?
                              <img src={this.state.imageUrl} width="200px" alt="" />
                          :
                          <></>
                          }
                        </div>

                      </div>
                    </div>

                    <div className="col-12 mb-3">
                      <div className="form-group">
                        <label>Галерея изооброжений</label>
                        <Dropzone multiple={true} onDrop={this.onDropGallery} accept={{ 'image/*': [] }} />
                        <div className="dropimages" style={{display:'flex'}}>
                          {
                            this.state.gallery.items?.map(image_url => {
                              return (
                                <img src={image_url} width="200px" alt="" />
                              )
                            })
                          }
                        </div>
                        
                      </div>
                    </div>

                    <div className="col-12 mb-3">
                      <div className="form-group">
                        <label>Документы</label>
                        <Dropzone multiple={true} onDrop={this.onDropDocs}  />
                        <div className="dropimages" style={{ display: 'flex' }}>
                          <ul>
                            
                          {
                              this.state.files.items?.map(doc_url => {
                              return (
                                <li> 
                                  <a href={doc_url}>{doc_url}</a>
                                </li>
                              )
                            })
                          }

                          </ul>
                        </div>

                      </div>
                    </div>



                    
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col d-flex justify-content-start">
                  <button className="btn btn-primary" type="submit">Сохранить</button>
                </div>
              </div>
            </form>

          </div>
        </div>


      </div>
    )
  }
}
