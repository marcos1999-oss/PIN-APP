import { put, call, fork, takeLatest } from 'redux-saga/effects'
import normalize from 'json-api-normalizer'

import {
  FETCH_PIN_CATALOGS,
  VIEW_PIN_CATALOG,
} from '../actions/types'
import {
  fetchPinCatalogsSuccess,
  fetchPinCatalogsFail,
  viewPinCatalogSuccess,
} from '../actions/pinCatalogActions'
import * as pinCatalogApi from '../services/pinCatalogApi'


export function* fetchPinCatalogsSaga(action) {
  try {
    const response = yield call(pinCatalogApi.fetchPinCatalogs, action.params);
    const { meta } = response.data;
    const pinCatalogs = normalize(response.data).pinCatalogs;

    yield put(fetchPinCatalogsSuccess({ pinCatalogs, meta }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(fetchPinCatalogsFail({ error }));

    action.onFail && action.onFail(error);
  }
}

export function* watchFetchPinCatalogs() {
  yield takeLatest(FETCH_PIN_CATALOGS, fetchPinCatalogsSaga)
}


export function* viewPinCatalogSaga(action) {
  yield put(viewPinCatalogSuccess({ pinCatalog: action.pinCatalog }));
  action.callback && action.callback();
}

export function* watchViewPinCatalog() {
  yield takeLatest(VIEW_PIN_CATALOG, viewPinCatalogSaga)
}
