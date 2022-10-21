import React, { useState} from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken"
import { AuthContext } from "../contexts/AuthContext";
import { Redirect, Route } from 'react-router-dom';



function Login() {
  const [sent, setSent] = useState(false)
  const [code, setCode] = useState('')
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const context = React.useContext(AuthContext);




  
  const handleSubmit = async () => {
    //reqres registered sample user

    console.log("loginPayload")
    try {
      const result = await context.sendCode({ username, email, password })
      setSent(true)
      // console.log("const", result)
      // history.push("/")
      // window.location.href = '/';

      // return (<Redirect to={{ pathname: '/' }} />)
    } catch (err) {
      setErrorMessage('Something went wrong')
      console.log("Something went wrong", err);
    }
  }

  const handleConfirm = async () => {
    //reqres registered sample user
    try {
      const result = await context.registerUser({email, code })
      window.location.href = '/profile';
    } catch (err) {
      setErrorMessage('Something went wrong')
      console.log("Something went wrong", err);
    }
  }



  return (
    
    <div className="login-register-page-area section-space--ptb_80">
      <div className="container">
        <div className="row ">
          <div className="col-lg-6 m-auto">
            <div className="login-content">
              
              {errorMessage.length ?
                <div className="alert alert-danger"> {errorMessage} </div>: ""
              }
              
              {!sent?
              <>
                <div className="login-header mb-40">
                  <h3 className="mb-2">Register</h3>
                  <h5>Become a member</h5>
                </div>
                <form action="#"
                  onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit();
                  }}
                >
                  <input type="text" name="name" onChange={e => setUsername(e.target.value)} placeholder="Username" />
                  <input type="email" name="email" onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
                  <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
                  
                  <div className="button-box mt-4">
                    <button type="submit" className="btn btn-primary btn-large">Register Now</button>
                  </div>
                  <div className="member-register mt-5">
                    <p> A member? <a href="login"> Log in now</a></p>
                  </div>
                </form>

              </>
              :
                <>
                  <div className="login-header mb-40">
                    <h3 className="mb-2">Confirm</h3>
                  </div>
                  <form action="#"
                    onSubmit={(event) => {
                      event.preventDefault()
                      handleConfirm();
                    }}
                  >
                    <input type="text" name="code" autoComplete={false} onChange={e => setCode(e.target.value)} placeholder="Код из email" />

                    <div className="button-box mt-4">
                      <button type="submit" className="btn btn-primary btn-large">Confirm</button>
                    </div>
                    <div className="member-register mt-5">
                      <p > Не пришел email? <a href="#" onClick={() => handleSubmit()}>Отправить ещё раз</a></p>
                    </div>
                  </form>
                </>
              }
            </div>
          </div>
        </div>
      </div>
      
    </div>

  );
}
export default Login