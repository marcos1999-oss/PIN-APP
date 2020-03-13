import {
  CREATE_REPORT,
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_FAIL,
  SET_REPORT_FIELD,
} from './types'


export const createReport = ({ params, onSuccess, onFail }) => ({
  type: CREATE_REPORT,
  params,
  onSuccess,
  onFail,
});

export const createReportSuccess = ({ report }) => ({
  type: CREATE_REPORT_SUCCESS,
  report,
});

export const createReportFail = ({ error }) => ({
  type: CREATE_REPORT_FAIL,
  error,
});

export const setReportField = ({ name, value }) => ({
  type: SET_REPORT_FIELD,
  name,
  value,
});
