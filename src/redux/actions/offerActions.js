import {
  FETCH_OFFERS_SUCCESS,
} from './types'


export const fetchOffersSuccess = ({ offers }) => ({
  type: FETCH_OFFERS_SUCCESS,
  offers,
});
