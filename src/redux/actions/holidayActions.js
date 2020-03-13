import {
  FETCH_HOLIDAYS,
  FETCH_HOLIDAYS_SUCCESS,
  FETCH_HOLIDAYS_FAIL,
} from './types'


export const fetchHolidays = ({ params }) => ({
  type: FETCH_HOLIDAYS,
  params,
});

export const fetchHolidaysSuccess = ({ holidays }) => ({
  type: FETCH_HOLIDAYS_SUCCESS,
  holidays,
});

export const fetchHolidaysFail = ({ error }) => ({
  type: FETCH_HOLIDAYS_FAIL,
  error,
});
