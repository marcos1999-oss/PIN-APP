import {
  FETCH_CURRENT_FIRM_REPORT,
  FETCH_CURRENT_FIRM_REPORT_SUCCESS,
  FETCH_CURRENT_FIRM_REPORT_FAIL,
  FETCH_FIRM_REPORTS,
  FETCH_FIRM_REPORTS_SUCCESS,
  FETCH_FIRM_REPORTS_FAIL,
} from './types'


export const fetchCurrentFirmReport = () => ({
  type: FETCH_CURRENT_FIRM_REPORT,
});

export const fetchCurrentFirmReportSuccess = ({ firmReport }) => ({
  type: FETCH_CURRENT_FIRM_REPORT_SUCCESS,
  firmReport,
});

export const fetchCurrentFirmReportFail = ({ error }) => ({
  type: FETCH_CURRENT_FIRM_REPORT_FAIL,
  error,
});

export const fetchFirmReports = ({ params }) => ({
  type: FETCH_FIRM_REPORTS,
  params,
});

export const fetchFirmReportsSuccess = ({ firmReports }) => ({
  type: FETCH_FIRM_REPORTS_SUCCESS,
  firmReports,
});

export const fetchFirmReportsFail = ({ error }) => ({
  type: FETCH_FIRM_REPORTS_FAIL,
  error,
});