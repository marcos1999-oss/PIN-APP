import Immutable from 'seamless-immutable'
import normalize from 'json-api-normalizer'
import { map, isUndefined, isEmpty, get } from 'lodash'

import {
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_FAIL,
  SET_REPORT_FIELD,
} from '../actions/types';


const INIT_STATE = Immutable({
  wrongLocation: false,
  falseOffers: false,
  notWorkingPhone: false,
  incorrectOpenedHour: false,
  differentBusinessName: false,
  other: false,
  meta: {
    loading: false,
  },
});

const reportReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_REPORT_SUCCESS:
      return state.merge({ meta: { loading: false } }, { deep: true });
    case CREATE_REPORT_FAIL:
      return state.merge({ meta: { loading: false } }, { deep: true });

    case SET_REPORT_FIELD:
      let newState = {};
      newState[action.name] = action.value;

      return state.merge(newState);

    default:
      return state;
  }
};

export default reportReducer;
