import {
  FETCH_PAYMENTS,
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_FAIL,
  SEND_PAYMENTS,
  FETCH_CARD_DETAILS,
  FETCH_CARD_DETAILS_SUCCESS,
  FETCH_CARD_DETAILS_FAIL,
  SEND_STRIPE_TOKEN,
  SEND_STRIPE_TOKEN_SUCCESS,
  SEND_STRIPE_TOKEN_FAIL
} from './types'


export const fetchPayments = ({ params, onSuccess, onFail }) => ({
  type: FETCH_PAYMENTS,
  params,
  onSuccess,
  onFail,
});

export const fetchPaymentsSuccess = ({ payments }) => ({
  type: FETCH_PAYMENTS_SUCCESS,
  payments,
});

export const fetchPaymentsFail = ({ error }) => ({
  type: FETCH_PAYMENTS_FAIL,
  error,
});

export const fetchCardDetails = ({ onSuccess, onFail }) => ({
  type: FETCH_CARD_DETAILS,
  onSuccess,
  onFail,
});

export const fetchCardDetailsSuccess = ({ card }) => ({
  type: FETCH_CARD_DETAILS_SUCCESS,
  card,
});

export const fetchCardDetailsFail = ({ error }) => ({
  type: FETCH_CARD_DETAILS_FAIL,
  error,
});

export const sendStripeTokenSuccess = ({ payments }) => ({
  type: SEND_STRIPE_TOKEN_SUCCESS,
  payments,
});

export const sendStripeTokenFail = ({ error }) => ({
  type: SEND_STRIPE_TOKEN_FAIL,
  error,
});

export const sendPayments = ({ params, onSuccess, onFail }) => ({
  type: SEND_PAYMENTS,
  params,
  onSuccess,
  onFail,
});

export const sendStripeToken = ({ token, onSuccess, onFail }) => ({
  type: SEND_STRIPE_TOKEN,
  token,
  onSuccess,
  onFail,
});
