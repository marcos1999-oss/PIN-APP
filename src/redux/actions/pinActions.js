import {
  FETCH_MY_PINS,
  FETCH_MY_PINS_SUCCESS,
  FETCH_MY_PINS_FAIL,
  VIEW_PIN,
  VIEW_PIN_SUCCESS,
  DELETE_PIN,
  DELETE_PIN_SUCCESS,
  ACTIVATE_PIN,
  BUY_PIN,
  FETCH_NEAREST_PINS,
  FETCH_NEAREST_PINS_SUCCESS,
  FETCH_NEAREST_PINS_FAIL,
  VISIT_PIN,
} from './types'


export const fetchMyPins = ({ params, onSuccess, onFail }) => ({
  type: FETCH_MY_PINS,
  params,
  onSuccess,
  onFail,
});

export const fetchMyPinsSuccess = ({ pins }) => ({
  type: FETCH_MY_PINS_SUCCESS,
  pins,
});

export const fetchMyPinsFail = ({ error }) => ({
  type: FETCH_MY_PINS_FAIL,
  error,
});


export const viewPin = ({ pin, callback }) => ({
  type: VIEW_PIN,
  pin,
  callback,
});

export const viewPinSuccess = ({ pin }) => ({
  type: VIEW_PIN_SUCCESS,
  pin,
});


export const deletePin = ({ pin, onSuccess, onFail }) => ({
  type: DELETE_PIN,
  pin,
  onSuccess,
  onFail,
});

export const deletePinSuccess = ({ pin }) => ({
  type: DELETE_PIN_SUCCESS,
  pin,
});


export const activatePin = ({ pin, latitude, longitude, onSuccess, onFail }) => ({
  type: ACTIVATE_PIN,
  pin,
  latitude,
  longitude,
  onSuccess,
  onFail,
});


export const buyPin = ({ pinCatalog, onSuccess, onFail }) => ({
  type: BUY_PIN,
  pinCatalog,
  onSuccess,
  onFail,
});


export const fetchNearestPins = ({ params, onSuccess, onFail }) => ({
  type: FETCH_NEAREST_PINS,
  params,
  onSuccess,
  onFail,
});

export const fetchNearestPinsSuccess = ({ pins }) => ({
  type: FETCH_NEAREST_PINS_SUCCESS,
  pins,
});

export const fetchNearestPinsFail = ({ error }) => ({
  type: FETCH_NEAREST_PINS_FAIL,
  error,
});


export const visitPin = ({ id, latitude, longitude }) => ({
  type: VISIT_PIN,
  id,
  latitude,
  longitude,
});
