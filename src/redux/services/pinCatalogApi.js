import { api } from './api';


export const fetchPinCatalogs = (params) => {

  return api.get('/business/pin_catalogs', params);
};
