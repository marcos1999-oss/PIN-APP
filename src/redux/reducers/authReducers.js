import Immutable from 'seamless-immutable'

import {
  LOCATION_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_OUT,
  UPDATE_ACCOUNT_SUCCESS,
  SET_COMPANY_FEATURES_SUCCESS,
} from '../actions/types'


const INIT_STATE = Immutable({
  me: {},
  home_connected_users: 0,
  pins_connected_users: 0,
  latitude: null,
  longitude: null,
  access_token: null,
  client: null,
  uid: null,
});

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOCATION_SUCCESS:
      return state.merge({
        latitude: action.latitude,
        longitude: action.longitude,
      });

    case SIGN_IN_SUCCESS:
      return state.merge({
        me: action.response ? action.response.data.data : null,
        home_connected_users: action.response ? (action.response.data.data.home_connected_users || 0) : 0,
        pins_connected_users: action.response ? (action.response.data.data.pins_connected_users || 0) : 0,
        access_token: action.access_token,
        client: action.client,
        uid: action.uid,
      }, { deep: true });

    case SIGN_UP_SUCCESS:
      return state.merge({
        me: action.response ? action.response.data.data : null,
        access_token: action.access_token,
        client: action.client,
        uid: action.uid,
      }, { deep: true });

    case SIGN_OUT:
      return state.merge({
        me: null,
        access_token: null,
        client: null,
        uid: null,
      });

    case UPDATE_ACCOUNT_SUCCESS:
      return state.merge({
        me: action.user,
      }, { deep: true });

    case SET_COMPANY_FEATURES_SUCCESS:
      return state.setIn(['me', 'company_features'], action.features);

    default:
      return state;
  }
};

export default authReducer;
