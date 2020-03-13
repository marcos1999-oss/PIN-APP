import { put, call, fork, takeLatest } from 'redux-saga/effects'
import normalize from 'json-api-normalizer'

import {
  FETCH_HOLIDAYS,
} from '../actions/types'
import {
  fetchHolidaysSuccess,
  fetchHolidaysFail,
} from '../actions/holidayActions'
import * as holidayApi from '../services/holidayApi'


export function* fetchHolidaysSaga(action) {
  try {
    const response = yield call(holidayApi.fetchHolidays, action.params);

    const holidays = normalize(response.data).holidays;

    yield put(fetchHolidaysSuccess({ holidays }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(fetchHolidaysFail({ error }));

    action.onFail && action.onFail(error);
  }
}

export function* watchFetchHolidays() {
  yield takeLatest(FETCH_HOLIDAYS, fetchHolidaysSaga)
}
