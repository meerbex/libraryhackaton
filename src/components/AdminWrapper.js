import React, { useState, useEffect} from "react";

import { AuthContext } from "../contexts/AuthContext";

const AdminWrapper =  ({ component: Component, ...rest }) => {
  const context = React.useContext(AuthContext);
  const [user, setUser] = useState({})
  useEffect( () => {
    async function fetchMyAPI() {
      const cominguser = await context.getCurrentUser();
      setUser(cominguser)
      console.log("user", user)
    }
    fetchMyAPI();
    
  },[])
  
  // console.log(user)
  // this.setState(user)
  // const { title } = rest
  return (
      
      <div className=" " style={{marginBottom:30}}>
        <div className="container">
          <div className="row">
            
            <div className="col-lg-3 card">

            
              <div className="title-write">
              <a href="/profile"> <i className="fa fa-user mx-2"></i>Профиль</a>
              </div>
              
              

              {user?.role=='user'?
              
              <>
                <div className="title-write">
                  
                  <a href="/my_borrowed_books"><i className="fa fa-check-circle mx-2"></i>Заимствованные книги</a>
                </div>
                <div className="title-write">
                  <a href="/my_expired_books"><i className="fa fa-exclamation-triangle mx-2"></i>Просроченные книги</a>
                </div>
                <div className="title-write">
                  <a href="/my_pending_books"><i className="fa fa-bookmark mx-2"></i>Заброннированные книги</a>
                </div>
              </>
              :
              <></>
              }

              {user?.role=='admin'?
              
              <>
                <div className="title-write">
                  <a href="/my_books"><i className="fa fa-book  mx-2"></i>Книги</a>
                </div>
                <div className="title-write">
                  <a href="/borrowed_books_admin"><i className="fa fa-check-circle mx-2"></i>Заимствованные книги админ</a>
                </div>
                <div className="title-write">
                  <a href="/expired_books_admin"><i className="fa fa-exclamation-triangle mx-2"></i>Просроченные книги админ</a>
                </div>
                <div className="title-write">
                  <a href="/pending_books_admin"><i className="fa fa-bookmark mx-2"></i>Заброннированные книги админ</a>
                </div>
              </>
              :
              <></>
              }
              <div className="title-write">
              <a href="#!" onClick={() => context.logout()}><i className="fa fa-sign-out mx-2"></i>Выйти</a>
              </div>
              
            </div>
            <div className="col-lg-9">
            
              <div className="write-content-box">
                <Component/>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AdminWrapper;
