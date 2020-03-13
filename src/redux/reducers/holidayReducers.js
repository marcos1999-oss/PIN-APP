import Immutable from 'seamless-immutable'
import { isUndefined } from 'lodash'

import {
  FETCH_HOLIDAYS,
  FETCH_HOLIDAYS_SUCCESS,
  FETCH_HOLIDAYS_FAIL,
} from '../actions/types';


const INIT_STATE = Immutable({
  data: {},
  meta: {
    loading: false,
    loaded: false,
  },
});

const holidayReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_HOLIDAYS:
      return state.merge({ meta: { loading: true } }, { deep: true });
    case FETCH_HOLIDAYS_SUCCESS:
      return state.merge({ data: action.holidays, meta: { loading: false, loaded: true } }, { deep: true });
    case FETCH_HOLIDAYS_FAIL:
      return state.merge({ meta: { loading: false, loaded: false } }, { deep: true });

    default:
      return state;
  }
};

export default holidayReducer;
