import Immutable from 'seamless-immutable'
import { isUndefined } from 'lodash'

import {
  FETCH_FIRMS_SUCCESS,
} from '../actions/types';


const INIT_STATE = Immutable({
  data: {},
});

const firmReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_FIRMS_SUCCESS:
      if (isUndefined(action.firms)) { return state; }
      return state.merge({ data: action.firms }, { deep: true });

    default:
      return state;
  }
};

export default firmReducer;
