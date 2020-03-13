import Immutable from 'seamless-immutable'
import { isUndefined } from 'lodash'

import {
  FETCH_SCHEDULES_SUCCESS,
} from '../actions/types';


const INIT_STATE = Immutable({
  data: {},
});

const scheduleReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_SCHEDULES_SUCCESS:
      if (isUndefined(action.schedules)) { return state; }
      return state.merge({ data: action.schedules }, { deep: true });

    default:
      return state;
  }
};

export default scheduleReducer;
