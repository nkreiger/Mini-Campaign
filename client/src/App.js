import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// BrowserRouter is brains, it expects one child, so surround everything in a single div
// Route object is used to set-up a rule between a certain route and the components
import { connect } from "react-redux"; // grab connect helper from redux to wire up to app component
import * as actions from "./actions"; // grab all action creators

// Components
import Header from "./components/Header"; // this will always show despite the route page
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import SurveyNew from "./components/surveys/SurveyNew";

// responsible for all our view level set-up so routers
class App extends Component {
  // lifecycle method to fetch current user on load
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="routers">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// once we pass in actions in connect they are assigned to app as props
export default connect(null, actions)(App);
