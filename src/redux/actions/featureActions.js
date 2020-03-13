import {
  FETCH_FEATURES,
  FETCH_FEATURES_SUCCESS,
  FETCH_FEATURES_FAIL,
} from './types'


export const fetchFeatures = ({ params }) => ({
  type: FETCH_FEATURES,
  params,
});

export const fetchFeaturesSuccess = ({ features }) => ({
  type: FETCH_FEATURES_SUCCESS,
  features,
});

export const fetchFeaturesFail = ({ error }) => ({
  type: FETCH_FEATURES_FAIL,
  error,
});
