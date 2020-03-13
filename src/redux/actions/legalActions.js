import {
    FETCH_LEGAL_USER_TERMS,
    FETCH_LEGAL_USER_PRIVACY,
    FETCH_LEGAL_BUISNESS_TERMS,
    FETCH_LEGAL_BUSINESS_PRIVACY,
    FETCH_LEGAL_SUCCESS,
    FETCH_LEGAL_FAIL
} from './types'


export const fetchLegalUserPrivacy = ({ onSuccess, onFail }) => ({
    type: FETCH_LEGAL_USER_PRIVACY,
    onSuccess,
    onFail,
});

export const fetchLegalUserTerms = ({ onSuccess, onFail }) => ({
    type: FETCH_LEGAL_USER_TERMS,
    onSuccess,
    onFail,
});

export const fetchLegalBusinessTerms = ({ onSuccess, onFail }) => ({
    type: FETCH_LEGAL_BUISNESS_TERMS,
    onSuccess,
    onFail,
});

export const fetchLegalBusinessPrivacy = ({ onSuccess, onFail }) => ({
    type: FETCH_LEGAL_BUSINESS_PRIVACY,
    onSuccess,
    onFail,
});

export const fetchLegalSuccess = ({ legal }) => ({
    type: FETCH_LEGAL_SUCCESS,
    legal,
});

export const fetchLegalFail = ({ error }) => ({
    type: FETCH_LEGAL_FAIL,
    error,
});
