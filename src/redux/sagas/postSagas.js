import { put, call, fork, takeLatest } from 'redux-saga/effects'
import { get, isNull, isUndefined, map, filter } from 'lodash'
import moment from 'moment';
import normalize from 'json-api-normalizer'

import {
  FETCH_POSTS,
  FETCH_MY_POSTS,
  SEARCH_POSTS,
  CREATE_POST,
  EDIT_POST,
  VIEW_POST,
  PREVIEW_POST,
  LIKE_POST,
  DISLIKE_POST,
  UNFAVORITE_POST,
  DELETE_POST,
  FETCH_LIKED_POSTS,
  SWIPE_POST,
} from '../actions/types'
import {
  fetchPostsSuccess,
  fetchPostsFail,
  fetchMyPostsSuccess,
  fetchMyPostsFail,
  searchPostsSuccess,
  searchPostsFail,
  viewPostSuccess,
  previewPostSuccess,
  previewPostFail,
  likePostSuccess,
  dislikePostSuccess,
  unfavoritePostSuccess,
  deletePostSuccess,
  fetchLikedPostsSuccess,
  fetchLikedPostsFail,
} from '../actions/postActions'
import {
  fetchFirmsSuccess,
} from '../actions/firmActions'
import {
  fetchOffersSuccess,
} from '../actions/offerActions'
import {
  fetchFeaturesSuccess,
} from '../actions/featureActions'
import {
  fetchSchedulesSuccess,
} from '../actions/scheduleActions'
import * as feedApi from '../services/feedApi';
import * as postApi from '../services/postApi';


const serializePost = (post) => {
  const formData = new FormData();

  if (post.id) {
    formData.append('id', post.id);
  }

  if (post.status) {
    formData.append('status', post.status);
  }

  if (post.uploadMethod === 'photo' && get(post.photo, 'url') && !post.photo.url.startsWith('http')) {
    formData.append('photo', {
      uri: post.photo.url,
      type: 'image/jpeg',
      name: `${moment().unix()}.jpg`
    });

    formData.append('color_code', null);
    formData.append('description', null);
  } else if (post.uploadMethod === 'theme' && !isNull(post.colorCode) && !isNull(post.description)) {
    formData.append('remove_photo', true);

    formData.append('color_code', post.colorCode);
    formData.append('description', post.description);
  }

  const offersAttributes = map(post.offers, (offer) => {
    const weekDays = map(filter(offer.open, 'value'), (weekDay) => {
      switch (weekDay.id) {
        case 'Sun': return 0;
        case 'Mon': return 1;
        case 'Tue': return 2;
        case 'Wed': return 3;
        case 'Thu': return 4;
        case 'Fri': return 5;
        case 'Sat': return 6;
      }
    });

    return {
      id: offer.id,
      title: offer.title,
      week_days: `{${weekDays.join()}}`,
      start_time: offer.startTime || moment().format('HH:mm'),
      end_time: offer.endTime || moment().format('HH:mm'),
      percent: offer.percent,
      price: offer.price,
      vip: offer.vip,
    };
  });
  const validOffersAttributes = filter(offersAttributes, (attr) => {
    return (attr.title && attr.week_days.length > 2 && attr.start_time && attr.end_time && (attr.percent || attr.price));
  });

  let i = 0;
  for (let validOfferAttribute of validOffersAttributes) {
    let key = `offers_attributes[${i}]`;

    if (validOfferAttribute.id) {
      formData.append(`${key}[id]`, validOfferAttribute.id);
    }
    formData.append(`${key}[title]`, validOfferAttribute.title);
    formData.append(`${key}[week_days]`, validOfferAttribute.week_days);
    formData.append(`${key}[start_time]`, validOfferAttribute.start_time);
    formData.append(`${key}[end_time]`, validOfferAttribute.end_time);
    if (validOfferAttribute.percent) {
      formData.append(`${key}[percent]`, validOfferAttribute.percent);
    }
    if (validOfferAttribute.price) {
      formData.append(`${key}[price]`, validOfferAttribute.price);
    }
    formData.append(`${key}[vip]`, validOfferAttribute.vip);

    i++;
  }

  formData.append('title', post.title);
  formData.append('kinds', post.kinds);

  return formData;
};

export function* fetchPostsSaga(action) {
  try {
    const response = yield call(feedApi.feed, action.params);

    const { visitedLocations } = normalize(response.data);

    let postsQuery = {};
    map(visitedLocations, (visitedLocation) => {
      const firmId = get(visitedLocation.attributes, 'firmId', null);
      if (firmId) {
        const count = postsQuery[firmId] || 0;
        postsQuery[firmId] = count + 1;
      }
    });

    const params = { params: { ...action.params.params, q: postsQuery, currentPage: action.params.currentPage, perPage: action.params.perPage } };
    const postsResponse = yield call(postApi.fetchPosts, params);
    const { features, schedules, firms, offers, posts } = normalize(postsResponse.data);
    const { meta } = postsResponse.data;

    yield put(fetchFeaturesSuccess({ features }));
    yield put(fetchSchedulesSuccess({ schedules }));
    yield put(fetchFirmsSuccess({ firms }));
    yield put(fetchOffersSuccess({ offers }));
    yield put(fetchPostsSuccess({ posts, meta }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(fetchPostsFail({ error }));

    action.onFail && action.onFail(error);
  }
}

export function* watchFetchPosts() {
  yield takeLatest(FETCH_POSTS, fetchPostsSaga)
}

export function* fetchMyPostsSaga(action) {
  try {
    const params = { params: { ...action.params.params, currentPage: action.params.currentPage, perPage: action.params.perPage } };
    const response = yield call(postApi.fetchMyPosts, params);
    const { features, schedules, firms, offers, posts } = normalize(response.data);
    const { meta } = response.data;

    yield put(fetchFeaturesSuccess({ features }));
    yield put(fetchSchedulesSuccess({ schedules }));
    yield put(fetchFirmsSuccess({ firms }));
    yield put(fetchOffersSuccess({ offers }));
    yield put(fetchMyPostsSuccess({ posts, meta }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(fetchMyPostsFail({ error }));

    action.onFail && action.onFail(error);
  }
}

export function* watchFetchMyPosts() {
  yield takeLatest(FETCH_MY_POSTS, fetchMyPostsSaga)
}


export function* searchPostsSaga(action) {
  try {
    const response = yield call(postApi.searchPosts, action.params);

    const { features, schedules, firms, offers, posts } = normalize(response.data);

    yield put(fetchFeaturesSuccess({ features }));
    yield put(fetchSchedulesSuccess({ schedules }));
    yield put(fetchFirmsSuccess({ firms }));
    yield put(fetchOffersSuccess({ offers }));
    yield put(searchPostsSuccess({ posts }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(searchPostsFail({ error }));

    action.onFail && action.onFail(error);
  }
}

export function* watchSearchPosts() {
  yield takeLatest(SEARCH_POSTS, searchPostsSaga)
}


export function* createPostSaga(action) {
  try {
    const response = yield call(postApi.createPost, serializePost(action.post));

    const { features, schedules, firms, offers, posts } = normalize(response.data);

    yield put(fetchFeaturesSuccess({ features }));
    yield put(fetchSchedulesSuccess({ schedules }));
    yield put(fetchFirmsSuccess({ firms }));
    yield put(fetchOffersSuccess({ offers }));
    yield put(fetchMyPostsSuccess({ posts }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchCreatePost() {
  yield takeLatest(CREATE_POST, createPostSaga)
}


export function* editPostSaga(action) {
  try {
    const response = yield call(postApi.editPost, action.post.id, serializePost(action.post));

    const { features, schedules, firms, offers, posts } = normalize(response.data);

    yield put(fetchFeaturesSuccess({ features }));
    yield put(fetchSchedulesSuccess({ schedules }));
    yield put(fetchFirmsSuccess({ firms }));
    yield put(fetchOffersSuccess({ offers }));
    yield put(fetchMyPostsSuccess({ posts }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchEditPost() {
  yield takeLatest(EDIT_POST, editPostSaga)
}


export function* viewPostSaga(action) {
  yield put(viewPostSuccess({ post: action.post }));
  action.callback && action.callback();
}

export function* watchViewPost() {
  yield takeLatest(VIEW_POST, viewPostSaga)
}


export function* previewPostSaga(action) {
  try {
    const response = yield call(postApi.previewPost, serializePost(action.post));

    const { features, schedules, firms, offers, posts } = normalize(response.data);

    yield put(fetchFeaturesSuccess({ features }));
    yield put(fetchSchedulesSuccess({ schedules }));
    yield put(fetchFirmsSuccess({ firms }));
    yield put(fetchOffersSuccess({ offers }));
    if (action.post.id) {
      yield put(previewPostSuccess({ post: posts[action.post.id.toString()] }));
    } else {
      yield put(previewPostSuccess({ post: posts[''] }));
    }

    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(previewPostFail({ error }));
    action.onFail && action.onFail(error);
  }
}

export function* watchPreviewPost() {
  yield takeLatest(PREVIEW_POST, previewPostSaga)
}


export function* swipePostSaga(action) {
  try {
    yield call(postApi.swipePost, action.post.id);

    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchSwipePost() {
  yield takeLatest(SWIPE_POST, swipePostSaga)
}

export function* likePostSaga(action) {
  try {
    yield call(postApi.likePost, action.post.id);

    yield put(likePostSuccess({ post: action.post }));
    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchLikePost() {
  yield takeLatest(LIKE_POST, likePostSaga)
}

export function* dislikePostSaga(action) {
  try {
    yield call(postApi.dislikePost, action.post.id);

    yield put(dislikePostSuccess({ post: action.post }));
    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchDislikePost() {
  yield takeLatest(DISLIKE_POST, dislikePostSaga)
}

export function* unfavoritePostSaga(action) {
  try {
    yield call(postApi.unfavoritePost, action.post.id);

    yield put(unfavoritePostSuccess({ post: action.post }));
    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchUnfavoritePost() {
  yield takeLatest(UNFAVORITE_POST, unfavoritePostSaga)
}

export function* deletePostSaga(action) {
  try {
    const response = yield call(postApi.deletePost, action.post.id);
    const { features, schedules, firms, offers, posts } = normalize(response.data);

    if (posts) {
      yield put(fetchFeaturesSuccess({ features }));
      yield put(fetchSchedulesSuccess({ schedules }));
      yield put(fetchFirmsSuccess({ firms }));
      yield put(fetchOffersSuccess({ offers }));
      yield put(fetchMyPostsSuccess({ posts }));
    } else {
      yield put(deletePostSuccess({ post: action.post }));
    }

    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchDeletePost() {
  yield takeLatest(DELETE_POST, deletePostSaga)
}

export function* fetchLikedPostsSaga(action) {
  try {
    const params = { params: { ...action.params.params, currentPage: action.params.currentPage, perPage: action.params.perPage } };
    const response = yield call(postApi.fetchLikedPosts, params);
    const { features, schedules, firms, offers, posts } = normalize(response.data);
    const { meta } = response.data;

    yield put(fetchFeaturesSuccess({ features }));
    yield put(fetchSchedulesSuccess({ schedules }));
    yield put(fetchFirmsSuccess({ firms }));
    yield put(fetchOffersSuccess({ offers }));
    yield put(fetchLikedPostsSuccess({ posts, meta }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(fetchLikedPostsFail({ error: error }));

    action.onFail && action.onFail(error);
  }
}

export function* watchFetchLikedPosts() {
  yield takeLatest(FETCH_LIKED_POSTS, fetchLikedPostsSaga)
}
