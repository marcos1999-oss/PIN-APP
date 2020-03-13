import { api } from './api';


export const fetchFeatures = (params) => {

  return api.get('/business/features', params);
};
