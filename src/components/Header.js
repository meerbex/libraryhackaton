import React from "react";
import Search from "./Search";

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="navbar navbar-light py-lg-4 pt-3 px-0 pb-0">
          <div className="container">
            <div className="row w-100 align-items-center g-lg-2 g-0">
              <div className="col-xxl-2 col-lg-3">
                <a className="navbar-brand d-none d-lg-block" href="/">
                  <img
                    src="https://i.postimg.cc/2jxJTsWm/logo.png"
                    alt="eCommerce HTML Template"
                  />
                </a>
                <div className="d-flex justify-content-between w-100 d-lg-none">
                  <a className="navbar-brand" href="/">
                    <img
                      src="https://i.postimg.cc/2jxJTsWm/logo.png"
                      alt="eCommerce HTML Template"
                    />
                  </a>
                  <div className="d-flex align-items-center lh-1">
                    <div className="list-inline me-2">
                      <div className="list-inline-item">
                        <a
                          href="#!"
                          className="text-muted"
                          data-bs-toggle="modal"
                          data-bs-target="#userModal"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx={12} cy={7} r={4} />
                          </svg>
                        </a>
                      </div>
                      <div className="list-inline-item">
                        <a
                          className="text-muted position-relative "
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight"
                          href="#offcanvasExample"
                          role="button"
                          aria-controls="offcanvasRight"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-shopping-bag"
                          >
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1={3} y1={6} x2={21} y2={6} />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                          </svg>
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                            1
                            <span className="visually-hidden">
                              unread messages
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                    {}
                    <button
                      className="navbar-toggler collapsed"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#navbar-default"
                      aria-controls="navbar-default"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="icon-bar top-bar mt-0" />
                      <span className="icon-bar middle-bar" />
                      <span className="icon-bar bottom-bar" />
                    </button>
                  </div>
                </div>
              </div>
              <Search></Search>
              <div className="col-md-2 col-xxl-3 d-none d-lg-block">
                {}
                
              </div>
              <div className="col-md-2 col-xxl-1 text-end d-none d-lg-block">
                <div className="list-inline">
                  <div className="list-inline-item">
                    <a
                      href="shop-wishlist.html"
                      className="text-muted position-relative"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-heart"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                        5
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </a>
                  </div>
                  <div className="list-inline-item">
                    <a
                      href="/profile"
                      className="text-muted"
                      data-bs-toggle="modal"
                      data-bs-target="#userModal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-user"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx={12} cy={7} r={4} />
                      </svg>
                    </a>
                  </div>
                  <div className="list-inline-item">
                    <a
                      className="text-muted position-relative "
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      href="#offcanvasExample"
                      role="button"
                      aria-controls="offcanvasRight"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-shopping-bag"
                      >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1={3} y1={6} x2={21} y2={6} />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                        1
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
