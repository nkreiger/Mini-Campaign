// class based because need to use redux
// SurveyNew shows SurveyForm and SurveyForm review
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  // babel level react allows you to this without a constructor
  state = {
    showFormReview: false
  };
  //
  renderContent() {
    if (this.state.showFormReview) {
      // must mount form values so it doesn't clear out on cancel
      return (
        <SurveyFormReview
          onCancel={() =>
            this.setState({
              showFormReview: false
            })
          }
        />
      );
    } else {
      return (
        <SurveyForm
          onSurveySubmit={() =>
            this.setState({
              showFormReview: true
            })
          }
        />
      );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

// to clear out different form values in the correct scenario
export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
// by not passing in the value do not destroy we are saying that once a user navigates away from our survey form it will clear, but in between the review and submit, it will keep the values
