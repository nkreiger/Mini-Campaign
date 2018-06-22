// SurveyField contains logic to render a signle label and text input in our redux-form field
import React from "react";

// because field tag is rendering this, we can render the props tag that are being passed to it by fileld tag
// auto pulls input from props
export default ({ input, label, meta: { error, touched } }) => {
  // meta: ... pulls out both from meta
  return (
    <div className="form-group col-sm-12">
      <label>{label}</label>
      <br />
      <input className="survey-text-input" {...input} />
      <div className="form-validation">
        <span style={{ color: "red" }}>{touched && error}</span>
      </div>
    </div>
  );
};

/// ... is equivalent to doing onChange or onBlur because object already as those inside of it check console for confirm
