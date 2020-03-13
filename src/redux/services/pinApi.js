import { api } from './api';


export const fetchMyPins = (params) => {

  return api.get('/business/pins', params);
};

export const activatePin = (pin, latitude, longitude) => {

  return api.post(`/business/pins/${pin.id}/activate`, { latitude: latitude, longitude: longitude });
};

export const deletePin = (pin) => {

  return api.delete(`/business/pins/${pin.id}`);
};

export const buyPin = (pinCatalog) => {

  return api.post(`/business/pins`, { pin_catalog_id: pinCatalog.id });
};

export const fetchNearestPins = (params) => {

  return api.get('/pins', { params });
};

export const visitPin = (id, latitude, longitude) => {

  return api.post(`/pins/${id}/visit`, { lat: latitude, lng: longitude });
};