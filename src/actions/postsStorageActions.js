import { SAVE_POST_TO_STORAGE, DELETE_POST_FROM_STORAGE } from "./types";
export const savePostToStorage = item => {
  return {
    type: SAVE_POST_TO_STORAGE,
    payload: item
  };
};
export const deletePostFromStorage = item => {
  return {
    type: DELETE_POST_FROM_STORAGE,
    payload: item
  };
};
