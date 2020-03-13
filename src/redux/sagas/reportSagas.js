import { put, call, fork, takeLatest } from 'redux-saga/effects'

import {
  CREATE_REPORT,
} from '../actions/types'
import {
  createReportSuccess,
  createReportFail,
} from '../actions/reportActions'
import * as reportApi from '../services/reportApi'


export function* createReportSaga(action) {
  try {
    const response = yield call(reportApi.createReport, action.params);
    yield put(createReportSuccess({ report: response }));
    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(createReportFail({ error }));
    action.onFail && action.onFail(error);
  }
}

export function* watchCreateReport() {
  yield takeLatest(CREATE_REPORT, createReportSaga)
}
