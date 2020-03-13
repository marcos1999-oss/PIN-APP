import { api } from './api';


export const createSupportTicket = (params) => {

  return api.post('/support_tickets', params);
};

export const createSupportTicketBusiness = (params) => {

  return api.post('/business/support_tickets', params);
};
