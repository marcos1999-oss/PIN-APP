import { put, call, fork, takeLatest } from 'redux-saga/effects'
import { get, isNull, isUndefined, map, filter } from 'lodash'
import normalize from 'json-api-normalizer'

import {
  FETCH_FIRM_REPORTS,
  FETCH_CURRENT_FIRM_REPORT,
} from '../actions/types'
import {
  fetchFirmReportsSuccess,
  fetchFirmReportsFail,
  fetchCurrentFirmReportSuccess,
  fetchCurrentFirmReportFail,
} from '../actions/firmReportActions'
import {
  fetchFirmsSuccess,
} from '../actions/firmActions'
import {
  fetchFeaturesSuccess,
} from '../actions/featureActions'
import {
  fetchSchedulesSuccess,
} from '../actions/scheduleActions'
import * as firmReportApi from '../services/firmReportApi'


export function* fetchFirmReportsSaga(action) {
  try {
    const response = yield call(firmReportApi.fetchFirmReports, action.params);

    const { features, schedules, firms, firmReports } = normalize(response.data);

    yield put(fetchFeaturesSuccess({ features }));
    yield put(fetchSchedulesSuccess({ schedules }));
    yield put(fetchFirmsSuccess({ firms }));
    yield put(fetchFirmReportsSuccess({ firmReports }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(fetchFirmReportsFail({ error }));

    action.onFail && action.onFail(error);
  }
}

export function* watchFetchFirmReports() {
  yield takeLatest(FETCH_FIRM_REPORTS, fetchFirmReportsSaga)
}


export function* fetchCurrentFirmReportSaga(action) {
  try {
    const response = yield call(firmReportApi.fetchCurrentFirmReport);

    const { features, schedules, firms, firmReports } = normalize(response.data);

    yield put(fetchFeaturesSuccess({ features }));
    yield put(fetchSchedulesSuccess({ schedules }));
    yield put(fetchFirmsSuccess({ firms }));
    yield put(fetchCurrentFirmReportSuccess({ firmReport: firmReports[''] }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(fetchCurrentFirmReportFail({ error }));

    action.onFail && action.onFail(error);
  }
}

export function* watchFetchCurrentFirmReport() {
  yield takeLatest(FETCH_CURRENT_FIRM_REPORT, fetchCurrentFirmReportSaga)
}