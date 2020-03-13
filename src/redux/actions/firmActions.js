import {
  FETCH_FIRMS_SUCCESS,
} from './types'


export const fetchFirmsSuccess = ({ firms }) => ({
  type: FETCH_FIRMS_SUCCESS,
  firms,
});
