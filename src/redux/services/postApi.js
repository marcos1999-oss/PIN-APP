import { api } from './api';


export const fetchPosts = (params) => {

  return api.get('/posts', params);
};

export const searchPosts = (params) => {

  return api.get('/posts/search', params);
};

export const fetchMyPosts = (params) => {

  return api.get('/business/posts', params);
};

export const swipePost = (postId) => {

  return api.post(`/posts/${postId}/swipe`);
};

export const likePost = (postId) => {

  return api.post(`/posts/${postId}/like`);
};

export const dislikePost = (postId) => {

  return api.post(`/posts/${postId}/dislike`);
};

export const unfavoritePost = (postId) => {

  return api.delete(`/posts/${postId}/unfavorite`);
};

export const deletePost = (postId) => {

  return api.delete(`/business/posts/${postId}`);
};

export const fetchLikedPosts = (params) => {

  return api.get('/posts/favorites', params);
};

export const createPost = (formData) => {

  return api.post('/business/posts', formData);
};

export const editPost = (postId, formData) => {

  return api.patch(`/business/posts/${postId}`, formData);
};

export const previewPost = (formData) => {

  return api.post('/business/posts/preview', formData);
};
