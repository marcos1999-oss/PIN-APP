import Immutable from 'seamless-immutable'
import { isUndefined } from 'lodash'

import {
  FETCH_MY_PINS,
  FETCH_MY_PINS_SUCCESS,
  FETCH_MY_PINS_FAIL,
  VIEW_PIN_SUCCESS,
  DELETE_PIN_SUCCESS,
  FETCH_NEAREST_PINS,
  FETCH_NEAREST_PINS_SUCCESS,
  FETCH_NEAREST_PINS_FAIL,
} from '../actions/types';


const INIT_STATE = Immutable({
  mine: {},
  near: {},
  viewing: {},
  meta: {
    loadingMine: false,
    loadedMine: false,
    loadingNear: false,
    loadedNear: false,
  },
});

const pinReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_MY_PINS:
      return state.merge({ meta: { loadingMine: true } }, { deep: true });
    case FETCH_MY_PINS_SUCCESS:
      if (isUndefined(action.pins)) {
        return state.merge({ meta: { loadingMine: false, loadedMine: true } }, { deep: true });
      } else {
        return state.merge({ mine: action.pins, meta: { loadingMine: false, loadedMine: true } }, { deep: true });
      }
    case FETCH_MY_PINS_FAIL:
      return state.merge({ meta: { loadingMine: false, loadedMine: false } }, { deep: true });

    case VIEW_PIN_SUCCESS:
      return state.merge({ viewing: action.pin }, { deep: true });

    case DELETE_PIN_SUCCESS:
      return state.update('mine', mine => mine.without(action.pin.id));

    case FETCH_NEAREST_PINS:
      return state.merge({ meta: { loadingNear: true } }, { deep: true });
    case FETCH_NEAREST_PINS_SUCCESS:
      if (isUndefined(action.pins)) {
        return state.merge({ meta: { loadingNear: false, loadedNear: true } }, { deep: true });
      } else {
        return state.merge({ near: action.pins, meta: { loadingNear: false, loadedNear: true } }, { deep: true });
      }
    case FETCH_NEAREST_PINS_FAIL:
      return state.merge({ meta: { loadingNear: false, loadedNear: false } }, { deep: true });

    default:
      return state;
  }
};

export default pinReducer;
