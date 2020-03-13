import { put, call, fork, takeLatest } from 'redux-saga/effects'
import normalize from 'json-api-normalizer'

import {
    FETCH_LEGAL_BUISNESS_TERMS,
    FETCH_LEGAL_BUSINESS_PRIVACY,
    FETCH_LEGAL_USER_TERMS,
    FETCH_LEGAL_USER_PRIVACY,
} from '../actions/types'
import {
    fetchLegalSuccess,
    fetchLegalFail,
} from '../actions/legalActions'
import * as legalApi from '../services/legalApi'


export function* fetchUserPrivacySaga(action) {
    try {
        const response = yield call(legalApi.fetchUserPrivacy);

        const legal = normalize(response.data).pages.undefined.attributes;

        yield put(fetchLegalSuccess({ legal }));

        action.onSuccess && action.onSuccess(legal);
    } catch (error) {
        yield put(fetchLegalFail({ error }));

        action.onFail && action.onFail(error);
    }
}

export function* watchFetchUserPrivacyLegal() {
    yield takeLatest(FETCH_LEGAL_USER_PRIVACY, fetchUserPrivacySaga)
}

export function* fetchUserTermsSaga(action) {
    try {
        const response = yield call(legalApi.fetchUserTerms);

        const legal = normalize(response.data).pages.undefined.attributes;

        yield put(fetchLegalSuccess({ legal }));

        action.onSuccess && action.onSuccess(legal);
    } catch (error) {
        yield put(fetchLegalFail({ error }));

        action.onFail && action.onFail(error);
    }
}

export function* watchFetchUserTermsLegal() {
    yield takeLatest(FETCH_LEGAL_USER_TERMS, fetchUserTermsSaga)
}

export function* fetchBusinessPrivacySaga(action) {
    try {
        const response = yield call(legalApi.fetchBusinessPrivacy);

        const legal = normalize(response.data).pages.undefined.attributes;

        yield put(fetchLegalSuccess({ legal }));

        action.onSuccess && action.onSuccess(legal);
    } catch (error) {
        yield put(fetchLegalFail({ error }));

        action.onFail && action.onFail(error);
    }
}

export function* watchFetchBusinessPrivacyLegal() {
    yield takeLatest(FETCH_LEGAL_BUSINESS_PRIVACY, fetchBusinessPrivacySaga)
}

export function* fetchBusinessTermsSaga(action) {
    try {
        const response = yield call(legalApi.fetchBusinessTerms);

        const legal = normalize(response.data).pages.undefined.attributes;

        yield put(fetchLegalSuccess({ legal }));

        action.onSuccess && action.onSuccess(legal);
    } catch (error) {
        yield put(fetchLegalFail({ error }));

        action.onFail && action.onFail(error);
    }
}

export function* watchFetchBusinessTermsLegal() {
    yield takeLatest(FETCH_LEGAL_BUISNESS_TERMS, fetchBusinessTermsSaga)
}
