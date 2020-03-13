import Immutable from 'seamless-immutable'
import { isUndefined } from 'lodash'

import {
    FETCH_LEGAL_SUCCESS,
    FETCH_LEGAL_FAIL,
} from '../actions/types';


const INIT_STATE = Immutable({
    data: {},
    meta: {
        loading: false,
        loaded: false,
    },
});

const legalReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_LEGAL_SUCCESS:
            return state.merge({ data: action.legal, meta: { loading: false, loaded: true } }, { deep: true });
        case FETCH_LEGAL_FAIL:
            return state.merge({ meta: { loading: false, loaded: false } }, { deep: true });

        default:
            return state;
    }
};

export default legalReducer;
