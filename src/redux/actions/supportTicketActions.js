import {
  CREATE_SUPPORT_TICKET,
} from './types'


export const createSupportTicket = ({ userType, params, onSuccess, onFail }) => ({
  type: CREATE_SUPPORT_TICKET,
  userType,
  params,
  onSuccess,
  onFail,
});
