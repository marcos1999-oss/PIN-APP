import { combineReducers } from 'redux'

import authReducers from './authReducers'
import holidayReducers from './holidayReducers'
import pinReducers from './pinReducers'
import pinCatalogReducers from './pinCatalogReducers'
import postReducers from './postReducers'
import reportReducers from './reportReducers'
import firmReducers from './firmReducers'
import firmReportReducers from './firmReportReducers'
import offerReducers from './offerReducers'
import featureReducers from './featureReducers'
import scheduleReducers from './scheduleReducers'
import paymentReducers from './paymentReducers'
import legalReducers from './legalReducers'


const allReducers = combineReducers({
  auth: authReducers,
  holidays: holidayReducers,
  pins: pinReducers,
  pinCatalogs: pinCatalogReducers,
  posts: postReducers,
  reports: reportReducers,
  firms: firmReducers,
  firmReports: firmReportReducers,
  offers: offerReducers,
  features: featureReducers,
  schedules: scheduleReducers,
    payments: paymentReducers,
  legal: legalReducers,
});

export default allReducers;
