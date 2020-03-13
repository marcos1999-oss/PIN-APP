/**
 * Created by hasanraza on 27/12/2019.
 */
import Immutable from 'seamless-immutable'
import { isUndefined } from 'lodash'

import {
    FETCH_CARD_DETAILS_SUCCESS,
} from '../actions/types';


const INIT_STATE = Immutable({
    card: {
        number: "",
        exp_month: '',
        exp_year: '',
        exp_cvv: "",
        name: "",
    },
});

const paymentReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_CARD_DETAILS_SUCCESS:
            if (isUndefined(action.card)) { return state; }
            return {
                ...state,
                card: {
                    number: action.card.card_number,
                    exp_month: `${action.card.card_exp_month}`,
                    exp_year: `${action.card.card_exp_year}`,
                    name: action.card.card_name,
                }
            };

        default:
            return state;
    }
};

export default paymentReducer;
