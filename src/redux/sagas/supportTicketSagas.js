import { put, call, fork, takeLatest } from 'redux-saga/effects'

import {
  CREATE_SUPPORT_TICKET,
} from '../actions/types'
import * as supportTicketApi from '../services/supportTicketApi'


export function* createSupportTicketSaga(action) {
  try {
    const apiCall = action.userType === 'user' ? supportTicketApi.createSupportTicket : supportTicketApi.createSupportTicketBusiness;
    yield call(apiCall, action.params);

    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchCreateSupportTicket() {
  yield takeLatest(CREATE_SUPPORT_TICKET, createSupportTicketSaga)
}
