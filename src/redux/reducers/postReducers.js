import Immutable from 'seamless-immutable'
import { map, isUndefined, isEmpty, get, sortBy, reverse, uniqBy } from 'lodash'

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
  VIEW_POST_SUCCESS,
  PREVIEW_POST,
  PREVIEW_POST_FAIL,
  PREVIEW_POST_SUCCESS,
  LIKE_POST_SUCCESS,
  DISLIKE_POST_SUCCESS,
  UNFAVORITE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  FETCH_LIKED_POSTS,
  FETCH_LIKED_POSTS_SUCCESS,
  FETCH_LIKED_POSTS_FAIL,
  SET_EDITING_POST_FIELD,
  SET_EDITING_POST,
  CLEAR_EDITING_POST,
} from '../actions/types';


const INIT_STATE = Immutable({
  data: {},
  mine: {},
  searched: {},
  liked: {},
  viewing: {},
  preview: {},
  editing: {
    photo: null,
    colorCode: null,
    description: null,
    title: '',
    kinds: 'regular',
    offers: [],
  },
  meta: {
    loading: false,
    loaded: false,
    loadingMine: false,
    loadedMine: false,
    loadingSearched: false,
    loadedSearched: false,
    loadingLiked: false,
    loadedLiked: false,
    loadingPreview: false,

  },
  pagination: {}
});

const postReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return state.merge({ meta: { loading: true } }, { deep: true });
    case FETCH_POSTS_SUCCESS:
      if (isUndefined(action.posts)) {
        return state.merge({ meta: { loading: false, loaded: true } }, { deep: true });
      } else {
        return state.merge({ data: action.posts, pagination: action.meta, meta: { loading: false, loaded: true } }, { deep: true });
      }
    case FETCH_POSTS_FAIL:
      return state.merge({ meta: { loading: false, loaded: false } }, { deep: true });

    case FETCH_MY_POSTS:
      return state.merge({ meta: { loadingMine: true } }, { deep: true });
    case FETCH_MY_POSTS_SUCCESS:
      if (isUndefined(action.posts)) {
        return state.merge({ meta: { loadingMine: false, loadedMine: true } }, { deep: true });
      } else {
        let allMinePosts = { ...action.posts, ...state.mine };
        allMinePosts = uniqBy(reverse(sortBy(allMinePosts, ['id'])), 'id');
        return state.merge({ mine: allMinePosts, pagination: action.meta, meta: { loadingMine: false, loadedMine: true } }, { deep: true });
      }
    case FETCH_MY_POSTS_FAIL:
      return state.merge({ meta: { loadingMine: false, loadedMine: false } }, { deep: true });

    case SEARCH_POSTS:
      return state.merge({ meta: { loadingSearched: true } }, { deep: true });
    case SEARCH_POSTS_SUCCESS:
      return state.set('searched', action.posts).merge({ meta: { loadingSearched: false, loadedSearched: true } }, { deep: true });
    case SEARCH_POSTS_FAIL:
      return state.merge({ meta: { loadingSearched: false, loadedSearching: false } }, { deep: true });

    case VIEW_POST_SUCCESS:
      return state.merge({ viewing: action.post }, { deep: true });
    case LIKE_POST_SUCCESS:
      return state.merge({ viewing: action.post }, { deep: true });
    case DISLIKE_POST_SUCCESS:
      return state.merge({ viewing: action.post }, { deep: true });
    case UNFAVORITE_POST_SUCCESS:
      return state.update('liked', liked => liked.without(action.post.id));

    case PREVIEW_POST:
      return state.merge({ meta: { loadingPreview: true } }, { deep: true });
    case PREVIEW_POST_FAIL:
      return state.merge({ meta: { loadingPreview: false } }, { deep: true });
    case PREVIEW_POST_SUCCESS:
      return state.merge({ preview: action.post, meta: { loadingPreview: false } }, { deep: true });

    case DELETE_POST_SUCCESS:
      return state.update('mine', mine => mine.without(action.post.id));

    case FETCH_LIKED_POSTS:
      return state.merge({ meta: { loadingLiked: true } }, { deep: true });
    case FETCH_LIKED_POSTS_SUCCESS:
      if (isUndefined(action.posts)) {
        return state.merge({ meta: { loadingLiked: false, loadedLiked: true } }, { deep: true });
      } else {
        let allLikedPosts = { ...action.posts, ...state.liked };
        allLikedPosts = reverse(sortBy(allLikedPosts, ['id']));
        return state.merge({ liked: allLikedPosts, pagination: action.meta, meta: { loadingLiked: false, loadedLiked: true } }, { deep: true });
      }
    case FETCH_LIKED_POSTS_FAIL:
      return state.merge({ meta: { loadingLiked: false, loadedLiked: false } }, { deep: true });

    case SET_EDITING_POST_FIELD:
      return state.setIn(['editing', action.fieldName], action.fieldValue);

    case SET_EDITING_POST:
      return state.merge({ editing: action.post }, { deep: true });

    case CLEAR_EDITING_POST:
      return state.merge({ editing: { ...INIT_STATE.editing, id: null, firm: {}, active: false } }, { deep: true });

    default:
      return state;
  }
};

export default postReducer;
