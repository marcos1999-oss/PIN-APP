import { api } from './api';


export const fetchHolidays = (params) => {

  return api.get('/business/holidays', params);
};
