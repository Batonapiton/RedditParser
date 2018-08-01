import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_FAIL,
  FETCH_POSTS_SUCCESS,
  SAVE_SUBREDDIT,
  SAVE_POSTS_TO_LOAD,
  SAVE_POSTS_TO_SHOW
} from "./types";

export const fetchPosts = queryInfo => {
  return dispatch => {
    dispatch(fetchPostsBegin());
    const { subreddit, postsToLoad } = queryInfo;
    return fetch(
      `http://www.reddit.com/r/${subreddit}.json?limit=${postsToLoad}`)
      .then(response => response.json())
      .then(json => {
        const postsToStore = json.data.children.map(post => post.data);
        dispatch(fetchPostsSuccess(postsToStore));
      })
      .catch(error => dispatch(fetchPostsFail(error)));
  };
};
export const fetchPostsBegin = () => {
  return {
    type: FETCH_POSTS_BEGIN
  };
};
export const fetchPostsSuccess = posts => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts
  };
};
export const fetchPostsFail = error => {
  return {
    type: FETCH_POSTS_FAIL,
    payload: error
  };
};
export const saveSubreddit = selectedSubreddit => {
  return {
    type: SAVE_SUBREDDIT,
    payload: selectedSubreddit
  };
};
export const savePostsToLoad = num => {
  return {
    type: SAVE_POSTS_TO_LOAD,
    payload: num
  };
};
export const savePostsToShow = num => {
  return {
    type: SAVE_POSTS_TO_SHOW,
    payload: num
  };
};
// export const createPost = postData => dispatch => {
//   console.log("post added");
//   fetch("https://jsonplaceholder.typicode.com/posts", {
//     method: "POST",
//     headers: {
//       "content-type": "application/json"
//     },
//     body: JSON.stringify(postData)
//   })
//     .then(res => res.json())
//     .then(post =>
//       dispatch({
//         type: NEW_POST,
//         payload: post
//       })
//     );
// };
