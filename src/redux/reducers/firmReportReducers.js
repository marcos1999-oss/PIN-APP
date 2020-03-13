import Immutable from 'seamless-immutable';
import { isUndefined } from 'lodash';

import {
  FETCH_CURRENT_FIRM_REPORT,
  FETCH_CURRENT_FIRM_REPORT_SUCCESS,
  FETCH_CURRENT_FIRM_REPORT_FAIL,
  FETCH_FIRM_REPORTS,
  FETCH_FIRM_REPORTS_SUCCESS,
  FETCH_FIRM_REPORTS_FAIL,
} from '../actions/types';


const INIT_STATE = Immutable({
  data: {},
  current: {
  },
  meta: {
    loading: false,
    loaded: false,
    loadingCurrent: false,
    loadedCurrent: false,
  },
});

const firmReportReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_FIRM_REPORTS:
      return state.merge({ meta: { loading: true } }, { deep: true });
    case FETCH_FIRM_REPORTS_SUCCESS:
      if (isUndefined(action.firmReports)) {
        return state.merge({ meta: { loading: false, loaded: true } }, { deep: true });
      } else {
        return state.merge({ data: action.firmReports, meta: { loading: false, loaded: true } }, { deep: true });
      }
    case FETCH_FIRM_REPORTS_FAIL:
      return state.merge({ meta: { loading: false, loaded: false } }, { deep: true });

    case FETCH_CURRENT_FIRM_REPORT:
      return state.merge({ meta: { loadingCurrent: true } }, { deep: true });
    case FETCH_CURRENT_FIRM_REPORT_SUCCESS:
      if (isUndefined(action.firmReport)) {
        return state.merge({ meta: { loadingCurrent: false, loadedCurrent: true } }, { deep: true });
      } else {
        return state.merge({ current: action.firmReport, meta: { loadingCurrent: false, loadedCurrent: true } }, { deep: true });
      }
    case FETCH_CURRENT_FIRM_REPORT_FAIL:
      return state.merge({ meta: { loadingCurrent: false, loadedCurrent: false } }, { deep: true });

    default:
      return state;
  }
};

export default firmReportReducer;
