
import React, { Component } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import Dropzone from 'react-dropzone'
import { getSettings, patchSettings } from '../utils/api';

export default class SettingsPage extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props)

        this.state = {
            "maxBooks": "",
            "maxDays": "",
        }

        this.handleSubmi = async (e) => {
            e.preventDefault()
            console.log('ew')
            await patchSettings({name: 'maxBooks', value: this.state.maxBooks})
            await patchSettings({name: 'maxDays', value: this.state.maxDays})
            // const user = await this.context.updateUser(this.state)
            // this.setState(user)
        }
    };
    
    async componentDidMount() {
        const settings = await getSettings()
        settings.forEach((setting) => {
            this.setState({[setting.name]: setting.value})
        })
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
                                              <div className="tab-content pt-3">
                                                  <div className="tab-pane active">
                                                      <form className="form" onSubmit={this.handleSubmi}>
                                                          <div className="row">
                                                              <div className="col">
                                                                  <div className="row">
                                                                      <div className="col">
                                                                          <div className="form-group">
                                                                              <label>Период займа книги (дни)</label>
                                                                              <input className="form-control" onChange={e => this.setState({ maxDays: e.target.value })}  type="text" name="name" value={this.state.maxDays} />
                                                                          </div>
                                                                      </div>
                                                                      <div className="col">
                                                                          <div className="form-group">
                                                                              <label>Максимум займственных книг на пользователя</label>
                                                                              <input onChange={e => this.setState({ maxBooks: e.target.value })}  className="form-control" type="text" name="username" value={this.state.maxBooks} />
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="row mt-2">
                                                              <div className="col d-flex justify-content-start">
                                                                  <button className="btn btn-primary" type="submit">Cохранить</button>
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
