import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  FETCH_MY_POSTS,
  FETCH_MY_POSTS_SUCCESS,
  FETCH_MY_POSTS_FAIL,
  SEARCH_POSTS,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAIL,
  CREATE_POST,
  CREATE_POST_SUCCESS,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  VIEW_POST,
  VIEW_POST_SUCCESS,
  PREVIEW_POST,
  PREVIEW_POST_SUCCESS,
  PREVIEW_POST_FAIL,
  LIKE_POST,
  LIKE_POST_SUCCESS,
  UNFAVORITE_POST,
  UNFAVORITE_POST_SUCCESS,
  DISLIKE_POST,
  DISLIKE_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  FETCH_LIKED_POSTS,
  FETCH_LIKED_POSTS_SUCCESS,
  FETCH_LIKED_POSTS_FAIL,
  SET_EDITING_POST_FIELD,
  SET_EDITING_POST,
  CLEAR_EDITING_POST,
  SWIPE_POST,
} from './types'

  export const fetchPosts = ({ params, perPage, currentPage }) => ({
  type: FETCH_POSTS,
  params: { ...params, currentPage, perPage },
});

export const fetchPostsSuccess = ({ posts, meta }) => ({
  type: FETCH_POSTS_SUCCESS,
  posts,
  meta
});

export const fetchPostsFail = ({ error }) => ({
  type: FETCH_POSTS_FAIL,
  error,
});


export const fetchMyPosts = ({ params = { params: { sort_key: 'id', sort_dir: 'desc' } }, onSuccess, onFail, perPage, currentPage }) => ({
  type: FETCH_MY_POSTS,
  params: { ...params, currentPage, perPage },
  onSuccess,
  onFail,
});

export const fetchMyPostsSuccess = ({ posts, meta }) => ({
  type: FETCH_MY_POSTS_SUCCESS,
  posts,
  meta,
});

export const fetchMyPostsFail = ({ error }) => ({
  type: FETCH_MY_POSTS_FAIL,
  error,
});


export const searchPosts = ({ params }) => ({
  type: SEARCH_POSTS,
  params,
});

export const searchPostsSuccess = ({ posts }) => ({
  type: SEARCH_POSTS_SUCCESS,
  posts,
});

export const searchPostsFail = ({ error }) => ({
  type: SEARCH_POSTS_FAIL,
  error,
});


export const createPost = ({ post, onSuccess, onFail }) => ({
  type: CREATE_POST,
  post,
  onSuccess,
  onFail,
});

export const createPostSuccess = ({ post }) => ({
  type: CREATE_POST_SUCCESS,
  post,
});


export const editPost = ({ post, onSuccess, onFail }) => ({
  type: EDIT_POST,
  post,
  onSuccess,
  onFail,
});

export const editPostSuccess = ({ post }) => ({
  type: EDIT_POST_SUCCESS,
  post,
});


export const viewPost = ({ post, callback }) => ({
  type: VIEW_POST,
  post,
  callback,
});

export const viewPostSuccess = ({ post }) => ({
  type: VIEW_POST_SUCCESS,
  post,
});

export const previewPost = ({ post, onSuccess, onFail }) => ({
  type: PREVIEW_POST,
  post,
  onSuccess,
  onFail,
});

export const previewPostSuccess = ({ post }) => ({
  type: PREVIEW_POST_SUCCESS,
  post,
});

export const previewPostFail = ({ error }) => ({
  type: PREVIEW_POST_FAIL,
  error,
});

export const swipePost = ({ post, onSuccess, onFail }) => ({
  type: SWIPE_POST,
  post,
  onSuccess,
  onFail,
});

export const likePost = ({ post, onSuccess, onFail }) => ({
  type: LIKE_POST,
  post,
  onSuccess,
  onFail,
});

export const likePostSuccess = ({ post }) => ({
  type: LIKE_POST_SUCCESS,
  post,
});

export const dislikePost = ({ post, onSuccess, onFail }) => ({
  type: DISLIKE_POST,
  post,
  onSuccess,
  onFail,
});

export const dislikePostSuccess = ({ post }) => ({
  type: DISLIKE_POST_SUCCESS,
  post,
});

export const unfavoritePost = ({ post, onSuccess, onFail }) => ({
  type: UNFAVORITE_POST,
  post,
  onSuccess,
  onFail,
});

export const unfavoritePostSuccess = ({ post }) => ({
  type: UNFAVORITE_POST_SUCCESS,
  post,
});

export const deletePost = ({ post, onSuccess, onFail }) => ({
  type: DELETE_POST,
  post,
  onSuccess,
  onFail,
});

export const deletePostSuccess = ({ post }) => ({
  type: DELETE_POST_SUCCESS,
  post,
});

export const fetchLikedPosts = ({ params, perPage, currentPage }) => ({
  type: FETCH_LIKED_POSTS,
  params: { ...params, currentPage, perPage },
});

export const fetchLikedPostsSuccess = ({ posts, meta }) => ({
  type: FETCH_LIKED_POSTS_SUCCESS,
  posts,
  meta,
});

export const fetchLikedPostsFail = ({ error }) => ({
  type: FETCH_LIKED_POSTS_FAIL,
  error,
});

export const setEditingPost = ({ post }) => ({
  type: SET_EDITING_POST,
  post,
});

export const setEditingPostField = ({ fieldName, fieldValue }) => ({
  type: SET_EDITING_POST_FIELD,
  fieldName,
  fieldValue,
});

export const clearPostData = () => ({
  type: CLEAR_EDITING_POST
});