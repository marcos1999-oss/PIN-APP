import {
  FETCH_PIN_CATALOGS,
  FETCH_PIN_CATALOGS_SUCCESS,
  FETCH_PIN_CATALOGS_FAIL,
  VIEW_PIN_CATALOG,
  VIEW_PIN_CATALOG_SUCCESS,
} from './types'


export const fetchPinCatalogs = ({ params, onSuccess, onFail }) => ({
  type: FETCH_PIN_CATALOGS,
  params,
  onSuccess,
  onFail,
});

export const fetchPinCatalogsSuccess = ({ pinCatalogs, meta }) => ({
  type: FETCH_PIN_CATALOGS_SUCCESS,
  pinCatalogs,
  meta
});

export const fetchPinCatalogsFail = ({ error }) => ({
  type: FETCH_PIN_CATALOGS_FAIL,
  error,
});


export const viewPinCatalog = ({ pinCatalog, callback }) => ({
  type: VIEW_PIN_CATALOG,
  pinCatalog,
  callback,
});

export const viewPinCatalogSuccess = ({ pinCatalog }) => ({
  type: VIEW_PIN_CATALOG_SUCCESS,
  pinCatalog,
});
