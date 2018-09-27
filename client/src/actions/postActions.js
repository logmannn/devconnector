import axios from "axios";
import { logoutUser } from "./authActions";
import { clearCurrentProfile } from "./profileActions";
import store from "../store";

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  LIKE_POST,
  DISLIKE_POST
} from "./types";

// Add Post
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response.status === 401) {
        store.dispatch(logoutUser());
        store.dispatch(clearCurrentProfile());
        window.location.href = "/login";
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response.status === 401) {
        store.dispatch(logoutUser());
        store.dispatch(clearCurrentProfile());
        window.location.href = "/login";
      } else {
        dispatch({
          type: GET_POSTS,
          payload: null
        });
      }
    });
};

// Delete Post
export const deletePost = id => dispatch => {
  if (window.confirm("Are you sure? This can not be undone")) {
    axios
      .delete(`/api/posts/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_POST,
          payload: id
        })
      )
      .catch(err => {
        if (err.response.status === 401) {
          store.dispatch(logoutUser());
          store.dispatch(clearCurrentProfile());
          window.location.href = "/login";
        } else {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
        }
      });
  }
};

// Add Like
export const addLike = (id, auth) => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    // .then(res => dispatch(getPosts()))
    .then(res =>
      dispatch({
        type: LIKE_POST,
        payload: {
          id,
          auth
        }
      })
    )
    .catch(err => {
      if (err.response.status === 401) {
        store.dispatch(logoutUser());
        store.dispatch(clearCurrentProfile());
        window.location.href = "/login";
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

// Remove Like
export const removeLike = (id, auth) => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res =>
      dispatch({
        type: DISLIKE_POST,
        payload: {
          id,
          auth
        }
      })
    )
    .catch(err => {
      if (err.response.status === 401) {
        store.dispatch(logoutUser());
        store.dispatch(clearCurrentProfile());
        window.location.href = "/login";
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

// Set Loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
