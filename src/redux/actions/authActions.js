import {
  FETCH_ME,
  LOCATION_SUCCESS,
  SIGN_IN,
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_UP,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_OUT,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_VERIFY,
  RESET_PASSWORD_SAVE,
  SET_COMPANY_FEATURES,
  SET_COMPANY_FEATURES_SUCCESS,
} from './types'


export const fetchMe = ({ userType, onSuccess, onFail }) => ({
  type: FETCH_ME,
  userType,
  onSuccess,
  onFail,
});

export const locationSuccess = ({ latitude, longitude }) => ({
  type: LOCATION_SUCCESS,
  latitude,
  longitude,
});

export const signIn = ({ params, onSuccess, onFail }) => ({
  type: SIGN_IN,
  params,
  onSuccess,
  onFail,
});

export const signInSuccess = ({ response, access_token, client, uid }) => ({
  type: SIGN_IN_SUCCESS,
  response,
  access_token,
  client,
  uid
});

export const signInFail = ({ error }) => ({
  type: SIGN_IN_FAIL,
  error,
});

export const signUp = ({ params, onSuccess, onFail }) => ({
  type: SIGN_UP,
  params,
  onSuccess,
  onFail,
});

export const signUpSuccess = ({ response, access_token, client, uid }) => ({
  type: SIGN_UP_SUCCESS,
  response,
  access_token,
  client,
  uid
});

export const signUpFail = ({ error }) => ({
  type: SIGN_UP_FAIL,
  error,
});

export const signOut = ({ onSuccess, onFail }) => ({
  type: SIGN_OUT,
  onSuccess,
  onFail,
});

export const deleteAccount = ({ userType, onSuccess, onFail }) => ({
  type: DELETE_ACCOUNT,
  userType,
  onSuccess,
  onFail,
});

export const updateAccount = ({ userType, params, onSuccess, onFail }) => ({
  type: UPDATE_ACCOUNT,
  userType,
  params,
  onSuccess,
  onFail,
});

export const updateAccountSuccess = ({ user }) => ({
  type: UPDATE_ACCOUNT_SUCCESS,
  user,
});

export const resetPassword = ({ userType, email, onSuccess, onFail }) => ({
  type: RESET_PASSWORD,
  userType,
  email,
  onSuccess,
  onFail,
});

export const resetPasswordVerify = ({ userType, token, onSuccess, onFail }) => ({
  type: RESET_PASSWORD_VERIFY,
  userType,
  token,
  onSuccess,
  onFail,
});

export const resetPasswordSave = ({ userType, token, password, onSuccess, onFail }) => ({
  type: RESET_PASSWORD_SAVE,
  userType,
  token,
  password,
  onSuccess,
  onFail,
});

export const setCompanyFeatures = ({ features }) => ({
  type: SET_COMPANY_FEATURES,
  features,
});

export const setCompanyFeaturesSuccess = ({ features }) => ({
  type: SET_COMPANY_FEATURES_SUCCESS,
  features,
});