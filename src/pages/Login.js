import React, { useState} from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken"
import { AuthContext } from "../contexts/AuthContext";
import { Redirect, Route } from 'react-router-dom';

function  Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const context = React.useContext(AuthContext);
  const handleSubmit = async () => {
    //reqres registered sample user
    
    // console.log(loginPayload)

    
    try {
      const result = await context.loginUser({ email, password })
      console.log('result', result)
      // history.push("/")
      window.location.href = '/profile';

      // return (<Redirect to={{ pathname: '/' }} />)
    } catch (err) {
      setErrorMessage('Неправильный логин или пароль')
      console.log("Something went wrong", err);
    }

  
  };

  return (
    
    <div className="login-register-page-area my-8">
      <div className="container">
        <div className="row ">
          <div className="col-lg-6 m-auto mt-5">
            <div className="login-content">
              {errorMessage.length ?
                <div className="alert alert-danger"> {errorMessage} </div> : ""
              }
              <div className="login-header mb-4">
                <h5>Вход</h5>
              </div>

              
              <form action="#"
                onSubmit={(event) => {
                  
                  event.preventDefault()
                  const [email, password] = event.target.children;
                  handleSubmit(email, password);
                }}
              >
                <input type="text" onChange={e=>setEmail(e.target.value)} id="email" name="email" placeholder="Email" />
                <input type="password" onChange={e => setPassword(e.target.value)} id="password" name="password" placeholder="Пароль" />
                <div className="remember-forget-wrap mb-30">
                  {/* <div className="remember-wrap">
                    <input type="checkbox" />
                    <p>Remember</p>
                    <span className="checkmark" />
                  </div> */}
                  {/* <div className="forget-wrap">
                    <a href="#">Forgot your password?</a>
                  </div> */}
                </div>
                <button type="submit" className="btn btn-primary btn-large">Вход</button>
                <div className="member-register mt-5">
                  <p> Нет аккаунта? <a href="/register"> Регистрация</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}
export default Login