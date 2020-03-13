import { put, call, fork, takeLatest } from 'redux-saga/effects'

import {
  FETCH_ME,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNT,
  RESET_PASSWORD,
  RESET_PASSWORD_VERIFY,
  RESET_PASSWORD_SAVE,
  SET_COMPANY_FEATURES,
} from '../actions/types'
import * as authApi from '../services/authApi'
import {
  signInSuccess,
  signInFail,
  signUpSuccess,
  signUpFail,
  updateAccountSuccess,
  setCompanyFeaturesSuccess,
} from '../actions/authActions'
import {
  saveCredentials,
  clearCredentials,
} from '../utils/storage'
import { setCredentials } from '../services/api'


export function* fetchMeSaga(action) {
  try {
    const apiCall = action.userType === 'user' ? authApi.fetchMeUser : authApi.fetchMeBusiness;

    const response = yield call(apiCall);

    const { headers } = response;
    const access_token = headers['access-token'],
          client       = headers['client'],
          uid          = headers['uid'];

    yield put(signInSuccess({ response, access_token, client, uid }));

    action.onSuccess && action.onSuccess(response);
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchFetchMe() {
  yield takeLatest(FETCH_ME, fetchMeSaga)
}

export function* signInSaga(action) {
  try {
    const apiCall = action.params.type === 'user' ? authApi.signIn : authApi.signInBusiness;

    const response = yield call(apiCall, action.params);

    const { headers } = response;
    const access_token = headers['access-token'],
          client       = headers['client'],
          uid          = headers['uid'];

    yield put(signInSuccess({ response, access_token, client, uid }));

    saveCredentials(action.params.type, access_token, client, uid);
    setCredentials(access_token, client, uid);

    action.onSuccess && action.onSuccess(response);
  } catch (error) {
    yield put(signInFail({ error }));
    action.onFail && action.onFail(error);
  }
}

export function* watchSignIn() {
  yield takeLatest(SIGN_IN, signInSaga)
}

export function* signUpSaga(action) {
  try {
    const apiCall = action.params.type === 'user' ? authApi.signUp : authApi.signUpBusiness;

    const response = yield call(apiCall, action.params);

    const { headers } = response;
    const access_token = headers['access-token'],
      client       = headers['client'],
      uid          = headers['uid'];

    yield put(signUpSuccess({ response, access_token, client, uid }));

    saveCredentials(action.params.type, access_token, client, uid);
    setCredentials(access_token, client, uid);

    action.onSuccess && action.onSuccess(response);
  } catch (error) {
    yield put(signUpFail({ error }));
    action.onFail && action.onFail(error);
  }
}

export function* watchSignUp() {
  yield takeLatest(SIGN_UP, signUpSaga)
}

export function* signOutSaga(action) {
  try {
    clearCredentials();
    setCredentials(null, null, null);

    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchSignOut() {
  yield takeLatest(SIGN_OUT, signOutSaga)
}

export function* deleteAccountSaga(action) {
  try {
    const apiCall = action.userType === 'user' ? authApi.deleteAccount : authApi.deleteAccountBusiness;
    yield call(apiCall);

    clearCredentials();
    setCredentials(null, null, null);

    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchDeleteAccount() {
  yield takeLatest(DELETE_ACCOUNT, deleteAccountSaga)
}

export function* updateAccountSaga(action) {
  try {
    const apiCall = action.userType === 'user' ? authApi.updateAccount : authApi.updateAccountBusiness;
    const response = yield call(apiCall, action.params);

    yield put(updateAccountSuccess({ user: response.data.data }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchUpdateAccount() {
  yield takeLatest(UPDATE_ACCOUNT, updateAccountSaga)
}


export function* resetPasswordSaga(action) {
  try {
    const apiCall = action.userType === 'user' ? authApi.resetPassword : authApi.resetPasswordBusiness;
    yield call(apiCall, action.email);

    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD, resetPasswordSaga)
}


export function* resetPasswordVerifySaga(action) {
  try {
    const apiCall = action.userType === 'user' ? authApi.resetPasswordVerify : authApi.resetPasswordVerifyBusiness;
    yield call(apiCall, action.token);

    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchResetPasswordVerify() {
  yield takeLatest(RESET_PASSWORD_VERIFY, resetPasswordVerifySaga)
}

export function* resetPasswordSaveSaga(action) {
  try {
    const apiCall = action.userType === 'user' ? authApi.resetPasswordSave : authApi.resetPasswordSaveBusiness;
    const response = yield call(apiCall, action.token, action.password);

    const { headers } = response;
    const access_token = headers['access-token'],
          client       = headers['client'],
          uid          = headers['uid'];

    action.onSuccess && action.onSuccess(access_token, client, uid);
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchResetPasswordSave() {
  yield takeLatest(RESET_PASSWORD_SAVE, resetPasswordSaveSaga)
}


export function* setCompanyFeaturesSaga(action) {
  yield put(setCompanyFeaturesSuccess({ features: action.features }));
}

export function* watchSetCompanyFeatures() {
  yield takeLatest(SET_COMPANY_FEATURES, setCompanyFeaturesSaga)
}
