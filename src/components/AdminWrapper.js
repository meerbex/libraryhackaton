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
                <a href="/chat"><i className="fa fa-fw fa-bar-chart mr-1"></i>My Chats</a>
              </div>
            <div className="title-write">
              <a href="/calendar"><i className="fa fa-fw fa-bar-chart mr-1"></i>Full Calendar</a>
            </div>
            <div className="title-write">
              <a href="/map"><i className="fa fa-fw fa-bar-chart mr-1"></i>Map</a>
            </div>
            </div>
            <div className="col-lg-9">
            <div className="share-thinking-title" style={{marginTop:30}}>
              <h4 className="title">{title?title:'Dashboard'}</h4>
            </div>
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
