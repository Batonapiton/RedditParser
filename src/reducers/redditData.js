import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_FAIL,
  FETCH_POSTS_SUCCESS,
  SAVE_SUBREDDIT,
  SAVE_POSTS_TO_LOAD
} from "../actions/types";

const initialState = {
  selectedSubreddit: "peopleFuckingDying",
  isLoading: false,
  error: null,
  postsToLoad: 30,
  postsToShow: 5,
  storedPosts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_POSTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        storedPosts: action.payload
      };
    case SAVE_SUBREDDIT:
      return {
        ...state,
        selectedSubreddit: action.payload
      };
    case SAVE_POSTS_TO_LOAD:
      return {
        ...state,
        postsToLoad: action.payload
      };

    default:
      return state;
  }
}
