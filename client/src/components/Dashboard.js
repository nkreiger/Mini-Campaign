import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

// css
import "../css/dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      <Link to="/surveys/new" className="btn btn-danger btn-lg add-survey-btn">
        <i className="fas fa-plus fa-2x add-btn-plus" />
      </Link>
    </div>
  );
};

export default Dashboard;
