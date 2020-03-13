import { api } from './api';
import { BASE_API_AUTH_URL } from './config';


export const fetchMeUser = () => {
  return api.get(`${BASE_API_AUTH_URL}/users/validate_token`);
};

export const fetchMeBusiness = () => {
  return api.get(`${BASE_API_AUTH_URL}/businesses/validate_token`);
};

export const signIn = (params) => {
  return api.post(`${BASE_API_AUTH_URL}/users/sign_in`, params);
};

export const signInBusiness = (params) => {
  return api.post(`${BASE_API_AUTH_URL}/businesses/sign_in`, params);
};

export const signUp = (params) => {
  return api.post(`${BASE_API_AUTH_URL}/users`, params);
};

export const signUpBusiness = (params) => {
  return api.post(`${BASE_API_AUTH_URL}/businesses`, params);
};

export const deleteAccount = () => {
  return api.delete(`${BASE_API_AUTH_URL}/users`);
};

export const deleteAccountBusiness = () => {
  return api.delete(`${BASE_API_AUTH_URL}/businesses`);
};

export const updateAccount = (params) => {
  return api.patch(`${BASE_API_AUTH_URL}/users`, params);
};

export const updateAccountBusiness = (params) => {
  return api.patch(`${BASE_API_AUTH_URL}/businesses`, params);
};

export const resetPassword = (email) => {
  return api.post(`${BASE_API_AUTH_URL}/users/password`, { email, redirect_url: '/password/edit' });
};

export const resetPasswordBusiness = (email) => {
  return api.post(`${BASE_API_AUTH_URL}/businesses/password`, { email, redirect_url: '/password/edit' });
};

export const resetPasswordVerify = (token) => {
  return api.get(
    `${BASE_API_AUTH_URL}/users/password/edit?reset_password_token=${token}&redirect_url=${BASE_API_AUTH_URL}/users/password`
  );
};

export const resetPasswordVerifyBusiness = (token) => {
  return api.get(
    `${BASE_API_AUTH_URL}/businesses/password/edit?reset_password_token=${token}&redirect_url=${BASE_API_AUTH_URL}/businesses/password`
  );
};

export const resetPasswordSave = (token, password) => {
  return api.put(`${BASE_API_AUTH_URL}/users/password`, {
    password: password,
    password_confirmation: password,
    reset_password_token: token,
  });
};

export const resetPasswordSaveBusiness = (token, password) => {
  return api.put(`${BASE_API_AUTH_URL}/businesses/password`, {
    password: password,
    password_confirmation: password,
    reset_password_token: token,
  });
};
