// to make ajax requests
import axios from "axios";

//types
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const fetchUser = () => async dispatch => {
  // if redux-thunk sees we returned a function as the argument it will automatically call this function and pass in dispatch as an argument
  // this will make the actual request
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const handleToken = token => async dispatch => {
  // handle callback token from stripe on user payment
  // post request because we want to send some information along to the bckend
  const res = await axios.post("/api/stripe", token);

  // make fetch_user request again so header picks up updated user model = updated header with correct credits
  // assuming we are getting in the response the exact same user model
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

// receives values of our form
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values);

  // redirect
  history.push("/surveys");

  // update local user model for credits
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

// grab surveys to current user
export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");

  dispatch({
    type: FETCH_SURVEYS,
    payload: res.data
  });
};
