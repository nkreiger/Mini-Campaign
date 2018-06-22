// shows user form input for review
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";

// get all actions
import * as actions from "../../actions";

// for redirect
import { withRouter } from "react-router-dom";

// css
import SurveyFormReviewCSS from "../../css/surveyFromReview.css";

// destructor onCancel from prop being passes from surveyNew
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  // because formValues is in an array
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div className="survey-review-form" key={name}>
        <label className="survey-review-label">{label}</label>
        <div className="survey-review-content">{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div className="survey-review">
      <h5>Please confirm your entries!</h5>
      {reviewFields}
      <button className="btn btn-success" onClick={onCancel}>
        Back
      </button>

      <button
        className="btn btn-primary"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey &nbsp;
        <i className="fas fa-envelope-square" />
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  // return values that will be added as props from the state to components
  // console.log(state) to see why the props are coming from there
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));

// This component should have the ability to go back to the form in order to make a change
// this is in the component state because it does not need to interact with any other besides survey form, if it did we would use redux
// withRouter allows access to history object on react-router allowing redirect on action
