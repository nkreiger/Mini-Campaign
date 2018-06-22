// lodash library
import _ from "lodash";

// Form for a user to add input
import React, { Component } from "react";

// redux helpers, documnetation is fantastic
import { reduxForm, Field } from "redux-form";
// this allows our reduxForm to connect to our store
// wired up similar to connect
// Field component is a helper for any type of input... text, radio, area...
import { Link } from "react-router-dom";

//css
import "../../css/surveyForm.css";

// Fields
import SurveyField from "./SurveyField";

// validation
import validateEmails from "../../validation/validateEmails";

// form fields
import formFields from "./formFields";

class SurveyForm extends Component {
  // helper function to isolate snippets to operate on
  renderFields() {
    // iterate over array of changing props with one function that will always create any number of fields in the field array of objects
    // key property must be unique in each
    return _.map(formFields, ({ label, name }) => {
      // meta is for validation
      return (
        <div className="survey-one">
          <div className="form-row">
            <Field
              key={name}
              component={SurveyField}
              type="text"
              label={label}
              name={name}
            />
          </div>
          <br />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <div className="form-row">
            <div className="form-group col-sm-12">
              <Link to="/surveys" className="btn btn-danger">
                Cancel
              </Link>
              <button className="btn btn-success survey-next" type="submit">
                Next &nbsp;
                <i className="fas fa-check" />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  // values object is the same object that comes from the field... name, subject.....
  const errors = {};
  // if redux form gets empty error, then assumes entire form is valid, else it will assume form values must be invalid and stop the submission process
  // must examine values object for errors and add them to the errors object

  errors.recipients = validateEmails(values.recipients || "");

  // for every field in the field array... remember you must use the key for the array
  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}
// reduxForm only takes one argument that contains multiple elements
// we may also add validate, it is auto ran every time user tries to submit the form
// this redux form helper initializes and configures the survey form
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);

// destroy... false means component will not be cleared
