import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

import "../../css/dashboard.css";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    // map over surveys and return a card
    return this.props.surveys.map(survey => {
      return (
        <div className="card" key={survey._id}>
          <div className="card-body">
            <h5 className="card-title">{survey.title}</h5>
            <p className="card-text">{survey.body}</p>
            <p className="survey-date">
              Sent on: <br />
              {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="choices">
            <a>Yes: {survey.yes}</a>
            <br />
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

// could be ({surveys})
function mapStateToProps(state) {
  return {
    // wired up to reducer, property is surveys
    surveys: state.surveys
  };
}

export default connect(mapStateToProps, {
  fetchSurveys
})(SurveyList);
