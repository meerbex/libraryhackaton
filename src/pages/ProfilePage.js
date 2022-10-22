
import React, { Component } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import Dropzone from 'react-dropzone'
import { patchUser } from '../utils/api';

export default class ProfilePage extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props)

        this.state = {
            "id": null,
            "username": null,
            "email": null,
            "authenticated": true,
            "avatarUrl": "https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg",
            "about": ""
        }

        this.onDropImage = (files) => {
            var requestOptions = {
                method: 'POST',
                body: files[0],
                redirect: 'follow'
            };
            fetch("https://www.filestackapi.com/api/store/S3?key=AsPOvdHfS7OWcc6fZnBAQz", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result); 
                    this.setState({ avatarUrl: result.url })
                })
                .catch(error => console.log('error', error));
            return files[0];

        };

        this.handleSubmi = async (e) => {
            e.preventDefault()
            await patchUser(this.state);
        }
    };
    
    async componentDidMount() {
        const user = await this.context.getCurrentUser()
        console.log(user)
        this.setState(user)
    }

  render() {
      return (

          <div>
              <div className="container">
                  <div className="row flex-lg-nowrap">
                      <div className="col">
                          <div className="row">
                              <div className="col mb-3">
                                  <div className="card">
                                      <div className="card-body">
                                          <div className="e-profile">
                                              <div className="row">
                                                  <div className="col-md-6 col-sm-auto mb-3">
                                                      <div className="mx-auto" style={{ width: '140px', textAlign: 'center' }}>
                                                          {this.state.avatarUrl?
                                                            <img src={this.state.avatarUrl} alt="" width='100px' style={{borderRadius: 50, height:100, objectFit:'cover'}}/>
                                                                :
                                                            <img src="https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg" alt="" width='100px' style={{borderRadius: 50, height:100, objectFit:'cover'}}/>
                                                            
                                                            }
                                                          

                                                      </div>
                                                      <div className="mt-4 mx-auto" style={{ textAlign: 'center' }}>
                                                          <Dropzone onDrop={this.onDropImage} maxFiles={1} multiple={false} accept={{ 'image/*': [] }}>
                                                              {({ getRootProps, getInputProps }) => (
                                                                  <span {...getRootProps()} className="btn btn-primary" type="button">
                                                                      <input  {...getInputProps()} />
                                                                        <i className="fa fa-fw fa-camera" />
                                                                        <span>Изменить фото</span>
                                                                    </span>
                                                              )}
                                                          </Dropzone>
                                                      </div>

                                                  </div>
                                                  <div className="col-md-6 d-flex flex-column flex-sm-row justify-content-between mb-3">
                                                      <div className="text-center text-sm-left mb-2 mb-sm-0">
                                                          <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{this.state.username}</h4>
                                                          <p className="mb-0">{this.state.username}</p>
                                                          <p className="mb-0">{this.state.email}</p>
                                                          <p className="mb-0">{this.state.phoneNumber}</p>

                                                      </div>
                                                      
                                                  </div>
                                              </div>

                                              <div className="tab-content pt-3">
                                                  <div className="tab-pane active">
                                                      <form className="form" onSubmit={this.handleSubmi}>
                                                          <div className="row">
                                                              <div className="col">
                                                                  <div className="row">
                                                                      <div className="col">
                                                                          <div className="form-group">
                                                                              <label>Имя</label>
                                                                              <input className="form-control" onChange={e => this.setState({ username: e.target.value })}  type="text" name="name" placeholder="Имя" defaultValue={this.state.username} />
                                                                          </div>
                                                                      </div>
                                                                      <div className="col">
                                                                          <div className="form-group">
                                                                              <label>Никнейм</label>
                                                                              <input onChange={e => this.setState({ username: e.target.value })}  className="form-control" type="text" name="username" placeholder="username" defaultValue={this.state.username} />
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                                  <br />
                                                                  <div className="row">
                                                                      <div className="col">
                                                                          <div className="form-group">
                                                                              <label>Email</label>
                                                                              <input onChange={e => this.setState({ email: e.target.value })}  className="form-control" type="text" placeholder="user@example.com" defaultValue={this.state.email} />
                                                                          </div>
                                                                      </div>

                                                                      <div className="col">
                                                                          <div className="form-group">
                                                                              <label>Номер телефона</label>
                                                                              <input onChange={e => this.setState({ phoneNumber: e.target.value })}  className="form-control" type="text" placeholder="+996777104033" defaultValue={this.state.phoneNumber} />
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                                  <br />
                                                                  <div className="row">
                                                                      <div className="col mb-3">
                                                                          <div className="form-group">
                                                                              <label>Описание</label>
                                                                              <textarea className="form-control" onChange={e=>this.setState({about: e.target.value})} rows={5} placeholder="My Bio" defaultValue={this.state.about} />
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="row">
                                                              <div className="col d-flex justify-content-start">
                                                                  <button className="btn btn-primary" type="submit">Save Changes</button>
                                                              </div>
                                                          </div>
                                                      </form>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>



  )
}
}
