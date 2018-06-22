import React from "react";

// css
import "../css/landing.css";

const Landing = () => {
  return (
    <div className="landing">
      <div className="container">
        <div className="landing-header">
          <h1>Miniature Email Campaigns</h1>
        </div>
        <div className="landing-text">
          <h4>
            <u>Simple</u>
            <br />
            <br />
            <b>Cheap</b>
            <br />
            <br />
            <em>Efficient</em>
            <br />
            <br />
            <br />
            Campaigns to optimize user growth at an affordable price!
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Landing;
