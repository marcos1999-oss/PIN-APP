import { api } from './api';


export const fetchUserPrivacy = () => {

    return api.get('/user/legal/privacy');
};

export const fetchUserTerms = () => {

    return api.get('/user/legal/terms');
};

export const fetchBusinessPrivacy = () => {

    return api.get('/business/legal/privacy');
};

export const fetchBusinessTerms = () => {

    return api.get('/business/legal/terms');
};
