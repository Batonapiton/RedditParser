import { combineReducers } from "redux";
import redditData from "./redditData";
import postsStorage from "./postsStorage";
import vkData from './vkData'
export default combineReducers({
  redditData,
  postsStorage,
  vkData
});
