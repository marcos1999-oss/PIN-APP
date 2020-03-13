import {
  FETCH_SCHEDULES_SUCCESS,
} from './types'


export const fetchSchedulesSuccess = ({ schedules }) => ({
  type: FETCH_SCHEDULES_SUCCESS,
  schedules,
});
