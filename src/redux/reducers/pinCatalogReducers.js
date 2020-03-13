import Immutable from 'seamless-immutable'
import normalize from 'json-api-normalizer'
import { map, isUndefined, isEmpty, get, reverse, sortBy } from 'lodash'

import {
  FETCH_PIN_CATALOGS,
  FETCH_PIN_CATALOGS_SUCCESS,
  FETCH_PIN_CATALOGS_FAIL,
  VIEW_PIN_CATALOG_SUCCESS,
} from '../actions/types';


const INIT_STATE = Immutable({
  data: {},
  viewing: {},
  meta: {
    loading: false,
    loaded: false,
  },
  pagination: {}
});

const pinCatalogReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_PIN_CATALOGS:
      return state.merge({ meta: { loading: true } }, { deep: true });
    case FETCH_PIN_CATALOGS_SUCCESS:
      if (isUndefined(action.pinCatalogs)) {
        return state.merge({ meta: { loading: false, loaded: true } }, { deep: true });
      } else {
        let allPinCatalogs = { ...state.data, ...action.pinCatalogs };
        allPinCatalogs = reverse(sortBy(allPinCatalogs, ['id']));
        return state.merge({ data: allPinCatalogs, pagination: action.meta, meta: { loading: false, loaded: true } }, { deep: true });
      }
    case FETCH_PIN_CATALOGS_FAIL:
      return state.merge({ meta: { loading: false, loaded: false } }, { deep: true });

    case VIEW_PIN_CATALOG_SUCCESS:
      return state.merge({ viewing: action.pinCatalog }, { deep: true });

    default:
      return state;
  }
};

export default pinCatalogReducer;
