import { api } from './api';


export const createReport = (params) => {

    return api.post('/reports', params);
};
