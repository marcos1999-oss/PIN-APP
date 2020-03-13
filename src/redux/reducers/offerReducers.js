import Immutable from 'seamless-immutable'
import { isUndefined } from 'lodash'

import {
  FETCH_OFFERS_SUCCESS,
} from '../actions/types';


const INIT_STATE = Immutable({
  data: {},
});

const offerReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_OFFERS_SUCCESS:
      if (isUndefined(action.offers)) { return state; }
      return state.merge({ data: action.offers }, { deep: true });

    default:
      return state;
  }
};

export default offerReducer;
