
import React, { Component } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import Dropzone from 'react-dropzone'
import { getUser } from '../utils/api';
import { withRouter } from 'react-router-dom';

class ProfilePageAnother extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props)

        this.state = {
            "id": null,
            "username": null,
            "email": null,
            "authenticated": true,
            "avatarUrl": "https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg",
            "phoneNumber": null,
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
                .then(result => this.setState({ avatarUrl: result.url }))
                .catch(error => console.log('error', error));
            return files[0];

        };
    };
    
    async componentDidMount() {
        const { id } = this.props.match.params;
        const user = await getUser({userId: id});
        console.log(user)
        this.setState(user)
    }
    async handleSubmi() {
        
        // const user = await this.context.updateUser(this.state)
        // this.setState(user)
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
                                          <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{this.state.username}</h4>
                                              <div className="tab-content pt-3">
                                                  <div className="tab-pane active">
                                                      <form className="form" >
                                                          <div className="row">
                                                              <div className="col">
                                                                  <div className="row">
                                                                      <div className="col">
                                                                          <div className="form-group">
                                                                              <label>Full Name</label>
                                                                              <input className="form-control" type="text" name="name" defaultValue={this.state.username} disabled />
                                                                          </div>
                                                                      </div>
                                                                      <div className="col">
                                                                          <div className="form-group">
                                                                              <label>Username</label>
                                                                              <input className="form-control" type="text" name="username" defaultValue={this.state.username} disabled/>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                                  <br />
                                                                  <div className="row">
                                                                      <div className="col">
                                                                          <div className="form-group">
                                                                              <label>Email</label>
                                                                              <input  className="form-control" type="text" defaultValue={this.state.email} disabled/>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                                  <br />
                                                                  <div className="row">
                                                                      <div className="col mb-3">
                                                                          <div className="form-group">
                                                                              <label>About</label>
                                                                              <textarea className="form-control" onChange={e=>this.setState({about: e.target.value})} rows={5} placeholder="My Bio" defaultValue={this.state.about} disabled/>
                                                                          </div>
                                                                      </div>
                                                                  </div>
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

export default withRouter(ProfilePageAnother);
