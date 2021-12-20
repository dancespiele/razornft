import * as Types from './types';
import { DispatchData } from '../../utils/utils.interfaces';

const initialState = {
    userRole: false,
    groupRole: false,
    error: null,
    loading: false,
};

export const accessReducer = (state = initialState, action: DispatchData<boolean>) => {
    switch (action.type) {
        case Types.ACCESS_HAS_USER_ROLE: {
            return {
                ...state,
                userRole: action.payload,
                error: null,
                loading: false,
            };
        }
    
        case Types.ACCESS_HAS_GROUP_ROLE: {
            return {
                ...state,
                groupRole: action.payload,
                error: null,
                loading: false,
            };
        }

        case Types.ACCESS_LOADING: {
            return {
                ...state,
                groupRole: action.payload,
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