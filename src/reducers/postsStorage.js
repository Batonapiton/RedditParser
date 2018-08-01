import {
  SAVE_POST_TO_STORAGE,
  DELETE_POST_FROM_STORAGE
} from "../actions/types";

const initialState = {
  posts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_POST_TO_STORAGE:
      return { ...state, posts: [...state.posts, action.payload] };
    case DELETE_POST_FROM_STORAGE:
      return {
        ...state,
        posts: state.posts.filter(item => item.key !== action.payload.key)
      };
    default:
      return state;
  }
}
