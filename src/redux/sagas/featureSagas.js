import { put, call, fork, takeLatest } from 'redux-saga/effects'
import normalize from 'json-api-normalizer'

import {
  FETCH_FEATURES,
} from '../actions/types'
import {
  fetchFeaturesSuccess,
  fetchFeaturesFail,
} from '../actions/featureActions'
import * as featureApi from '../services/featureApi'


export function* fetchFeaturesSaga(action) {
  try {
    const response = yield call(featureApi.fetchFeatures, action.params);

    const features = normalize(response.data).features;

    yield put(fetchFeaturesSuccess({ features }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(fetchFeaturesFail({ error }));

    action.onFail && action.onFail(error);
  }
}

export function* watchFetchFeatures() {
  yield takeLatest(FETCH_FEATURES, fetchFeaturesSaga)
}
