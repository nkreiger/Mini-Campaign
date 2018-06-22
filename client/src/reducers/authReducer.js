// create and export reducer, must give state an initialstate
import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
// returns false versus empty string
// default returns null
