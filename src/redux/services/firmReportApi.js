import { api } from './api';


export const fetchFirmReports = (params) => {

  return api.get('/business/firm_reports', params);
};

export const fetchCurrentFirmReport = () => {

  return api.get('/business/firm_reports/current');
};
