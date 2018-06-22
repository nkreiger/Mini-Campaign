// file to combine reducer
import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
// ES16 allows you to import reducer and rename it at same time
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

// whatever keys we pass to this object, represent the keys we give to our state object
export default combineReducers({
  auth: authReducer,
  // auth is being manufactured by the authReducer, the special key is auth
  // see other .js files in its use of auth
  form: reduxForm,
  surveys: surveysReducer
});
