import Immutable from 'seamless-immutable'
import { isUndefined } from 'lodash'

import {
  FETCH_FEATURES,
  FETCH_FEATURES_SUCCESS,
  FETCH_FEATURES_FAIL,
} from '../actions/types';


const INIT_STATE = Immutable({
  data: {},
  meta: {
    loading: false,
    loaded: false,
  },
});

const featureReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_FEATURES:
      return state.merge({ meta: { loading: true } }, { deep: true });
    case FETCH_FEATURES_SUCCESS:
      if (isUndefined(action.features)) { return state; }
      return state.merge({ data: action.features, meta: { loading: false, loaded: true } }, { deep: true });
    case FETCH_FEATURES_FAIL:
      return state.merge({ meta: { loading: false, loaded: false } }, { deep: true });

    default:
      return state;
  }
};

export default featureReducer;
