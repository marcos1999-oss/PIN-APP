import { api } from './api';


export const feed = () => {

  return api.get('/feed');
};
