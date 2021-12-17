import * as Types from './types';
import { DispatchData } from '../../utils/utils.interfaces';

const initialState = {
    hasRole: false,
    error: null,
    loading: false,
};

export const accessReducer = (state = initialState, action: DispatchData<unknown>) => {
    switch (action.type) {
        case Types.ACCESS_HAS_ROLE: {
            return {
                ...state,
                hasRole: action.payload as {hasAccess: boolean},
                error: null,
                loading: false,
            };
        }

        case Types.ACCESS_LOADING: {
            return {
                ...state,
                error: null,
                loading: true,
            };
        }

        case Types.ACCESS_ERROR: {
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        }

        default: {
            return state;
        }
    }
}