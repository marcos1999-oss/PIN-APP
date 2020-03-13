import { api } from './api';


export const fetchPayments = (params) => {

  return api.get('/business/payments', params);
};

export const sendPayments = (params) => {

  return api.post('/business/payments/send_payments', params);
};

export const fetchCardDetails = () => {

  return api.get('/business/card');
}

export const sendStripeToken = (params) => {

  return api.post('/business/card', params);
};
