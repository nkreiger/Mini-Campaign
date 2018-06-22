import React, { Component } from "react";
import { Link } from "react-router-dom";
// a href is for linking to a completelyl different domain like google

// hook up header to state and store to get user Auth
import { connect } from "react-redux";

// css
import "../css/header.css";

// components
import StripePayment from "./StripePayment";

class Header extends Component {
  // inspect this.props property, and depending on value return certain header
  renderContent() {
    switch (this.props.auth) {
      case null:
        return; // want to return nothing
      case false:
        return (
          <div
            className="collapse navbar-collapse nav-positioning"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item google-link">
                <a className="nav-link" href="/auth/google">
                  Google Login
                </a>
              </li>
            </ul>
          </div>
        );
      default:
        // not null, not false, must be logged in
        return (
          <div
            className="collapse navbar-collapse nav-positioning"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item stripe-link">
                <StripePayment />
              </li>
              <li className="nav-item stripe-link">
                <div className="btn btn-secondary">
                  Credits: {this.props.auth.credits}
                </div>
              </li>
              <li className="nav-item google-link">
                <a className="nav-link logout" href="/api/logout">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        );
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="navbar-brand"
          >
            Mini Campaign
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {this.renderContent()}
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(mapStateToProps)(Header);
