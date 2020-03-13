import { put, call, fork, takeLatest } from 'redux-saga/effects'
import normalize from 'json-api-normalizer'

import {
  FETCH_PAYMENTS,
  SEND_PAYMENTS,
  FETCH_CARD_DETAILS,
  SEND_STRIPE_TOKEN,
} from '../actions/types'
import {
  fetchPaymentsSuccess,
  fetchPaymentsFail,
  fetchCardDetailsSuccess,
  fetchCardDetailsFail,
  sendStripeTokenSuccess,
  sendStripeTokenFail
} from '../actions/paymentActions'
import * as paymentApi from '../services/paymentApi'


export function* fetchPaymentsSaga(action) {
  try {
    const response = yield call(paymentApi.fetchPayments, action.params);

    const payments = normalize(response.data).payments;

    yield put(fetchPaymentsSuccess({ payments }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(fetchPaymentsFail({ error }));

    action.onFail && action.onFail(error);
  }
}

export function* watchFetchPayments() {
  yield takeLatest(FETCH_PAYMENTS, fetchPaymentsSaga)
}


export function* sendPaymentsSaga(action) {
  try {
    const response = yield call(paymentApi.sendPayments, action.params);

    const payments = normalize(response.data).payments;

    yield put(fetchPaymentsSuccess({ payments }));

    action.onSuccess && action.onSuccess();
  } catch (error) {
    yield put(fetchPaymentsFail({ error }));

    action.onFail && action.onFail(error);
  }
}

export function* watchSendPayments() {
  yield takeLatest(SEND_PAYMENTS, sendPaymentsSaga)
}

export function* fetchCardDetailsSaga(action) {
  try {
    const response = yield call(paymentApi.fetchCardDetails);
    const card = response.data;
    yield put(fetchCardDetailsSuccess({ card }));
    action.onSuccess && action.onSuccess();
  }
  catch (error) {
    yield put(fetchCardDetailsFail({ error }));
  }
}

export function* sendStripeToken(action) {
  try {
    yield call(paymentApi.sendStripeToken, { token: action.token });
    action.onSuccess && action.onSuccess();
  }
  catch (error) {
    yield put(sendStripeTokenFail({ error }));
    action.onFail && action.onFail(error);
  }
}

export function* watchFetchCardDetails() {
  yield takeLatest(FETCH_CARD_DETAILS, fetchCardDetailsSaga)
}

export function* watchSendStripeToken() {
  yield takeLatest(SEND_STRIPE_TOKEN, sendStripeToken)
}
