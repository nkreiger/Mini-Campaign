import React, { Component } from "react";

import "../css/footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer bg-dark">
        <div className="container-fluid">
          <div className="row footer-row-text">
            <div className="col-12 text-center">
              <span className="copyright footer-text">
                {"\u00A9"}
                Kreiger Inc Designs 2018
              </span>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
