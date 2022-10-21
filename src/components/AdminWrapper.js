import React from "react";


const AdminWrapper = ({ component: Component, ...rest }) => {
  const { title } = rest
  return (
      
      <div className=" " style={{marginBottom:30}}>
        <div className="container">
          <div className="row">
            
            <div className="col-lg-3 card">

            
              <div className="title-write">
              <a href="/profile"> <i className="fa fa-fw fa-bar-chart mr-1"></i>Профиль</a>
              </div>
              <div className="title-write">
              <a href="/my_books"><i className="fa fa-fw fa-bar-chart mr-1"></i>Книги</a>
              </div>
              <div className="title-write">
              <a href="/my_borrowed_books"><i className="fa fa-fw fa-bar-chart mr-1"></i>Заимствованные книги</a>
              </div>
              <div className="title-write">
              <a href="/my_expired_books"><i className="fa fa-fw fa-bar-chart mr-1"></i>Просроченные книги</a>
              </div>
              <div className="title-write">
              <a href="/my_pending_books"><i className="fa fa-fw fa-bar-chart mr-1"></i>Заброннированные книги</a>
              </div>
              <div className="title-write">
              <a href="/borrowed_books_admin"><i className="fa fa-fw fa-bar-chart mr-1"></i>Заимствованные книги админ</a>
              </div>
              <div className="title-write">
              <a href="/expired_books_admin"><i className="fa fa-fw fa-bar-chart mr-1"></i>Просроченные книги админ</a>
              </div>
              <div className="title-write">
              <a href="/pending_books_admin"><i className="fa fa-fw fa-bar-chart mr-1"></i>Заброннированные книги админ</a>
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
