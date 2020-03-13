import { put, call, fork, takeLatest } from 'redux-saga/effects'
import normalize from 'json-api-normalizer'

import {
  FETCH_MY_PINS,
  VIEW_PIN,
  DELETE_PIN,
  ACTIVATE_PIN,
  BUY_PIN,
  FETCH_NEAREST_PINS,
  VISIT_PIN,
} from '../actions/types'
import {
  fetchMyPinsSuccess,
  fetchMyPinsFail,
  viewPinSuccess,
  deletePinSuccess,
  fetchNearestPinsSuccess,
  fetchNearestPinsFail,
} from '../actions/pinActions'
import * as pinApi from '../services/pinApi'


export function* fetchMyPinsSaga(action) {
  try {
    const response = yield call(pinApi.fetchMyPins, action.params);

    const pins = normalize(response.data).pins;

    yield put(fetchMyPinsSuccess({ pins }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(fetchMyPinsFail({ error }));

    action.onFail && action.onFail(error);
  }
}

export function* watchFetchMyPins() {
  yield takeLatest(FETCH_MY_PINS, fetchMyPinsSaga)
}


export function* viewPinSaga(action) {
  yield put(viewPinSuccess({ pin: action.pin }));
  action.callback && action.callback();
}

export function* watchViewPin() {
  yield takeLatest(VIEW_PIN, viewPinSaga)
}


export function* activatePinSaga(action) {
  try {
    const response = yield call(pinApi.activatePin, action.pin, action.latitude, action.longitude);
    const pins = normalize(response.data).pins;

    yield put(fetchMyPinsSuccess({ pins }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchActivatePin() {
  yield takeLatest(ACTIVATE_PIN, activatePinSaga)
}


export function* deletePinSaga(action) {
  try {
    yield call(pinApi.deletePin, action.pin);

    yield put(deletePinSuccess({ pin: action.pin }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchDeletePin() {
  yield takeLatest(DELETE_PIN, deletePinSaga)
}


export function* buyPinSaga(action) {
  try {
    yield call(pinApi.buyPin, action.pinCatalog);

    const response = yield call(pinApi.fetchMyPins, action.params);
    const pins = normalize(response.data).pins;

    yield put(fetchMyPinsSuccess({ pins }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchBuyPin() {
  yield takeLatest(BUY_PIN, buyPinSaga)
}


export function* fetchNearestPinsSaga(action) {
  try {
    const response = yield call(pinApi.fetchNearestPins, action.params);

    const pins = normalize(response.data).pins;

    yield put(fetchNearestPinsSuccess({ pins }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(fetchNearestPinsFail({ error }));

    action.onFail && action.onFail(error);
  }
}

export function* watchFetchNearestPins() {
  yield takeLatest(FETCH_NEAREST_PINS, fetchNearestPinsSaga)
}


export function* visitPinSaga(action) {
  yield call(pinApi.visitPin, action.id, action.latitude, action.longitude);
}

export function* watchVisitPin() {
  yield takeLatest(VISIT_PIN, visitPinSaga)
}