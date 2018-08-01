import { combineReducers } from "redux";
import redditData from "./redditData";
import postsStorage from "./postsStorage";
export default combineReducers({
  redditData,
  postsStorage
});
