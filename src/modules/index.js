import { combineReducers } from "redux";
import auth from "./auth";
import intro from "./intro"
import intros from "./intros"
import post from "./post";
import posts from "./posts";
import boards from "./boards";
import petitions from "./petitions";
import petition from "./petition";

const rootReducer = combineReducers({
  auth,
  intro,
  intros,
  post,
  posts,
  boards,
  petitions,
  petition
});

export default rootReducer;
