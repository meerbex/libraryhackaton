import React from "react";

class SearchOverlay extends React.Component {
  render() {
    return (
      <div className="search-overlay" id="search-overlay">
        <div className="search-overlay__header">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-12">
                
                <div className="search-content text-end">
                  <span
                    className="mobile-navigation-close-icon"
                    id="search-close-trigger"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="search-overlay__inner">
          <div className="search-overlay__body">
            <div className="search-overlay__form">
              <form action="#">
                <input type="text" placeholder="Search" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchOverlay;
