import { methods, web3 } from '../../utils/helpers';
import { Methods } from '../../utils/utils.interfaces';
import * as Types from './types';
import { Dispatch } from 'redux';

const accessLoading = () => ({
    type: Types.ACCESS_LOADING,
});

export const checkUserRole = (address: string) => async (dispatch: Dispatch) => {
    dispatch(accessLoading());

    try {
        const hasUserRole = await (methods as Methods<boolean>).hasRole(web3.utils.keccak256('USER_ROLE'), address).call();

        dispatch({
            type: Types.ACCESS_HAS_USER_ROLE,
            payload: hasUserRole,
            error: null,
        })
    } catch (error) {
        console.error(error);
        dispatch({
            type: Types.ACCESS_ERROR,
            payload: null,
            error,
        })
    }
}

export const checkGroupRole = (address: string) => async (dispatch: Dispatch) => {
    dispatch(accessLoading());

    try {
        const hasGroupRole = await (methods as Methods<boolean>).hasRole(web3.utils.keccak256('GROUP_ROLE'), address).call();

        dispatch({
            type: Types.ACCESS_HAS_GROUP_ROLE,
            payload: hasGroupRole,
            error: null,
        })
    } catch (error) {
        console.error(error);
        dispatch({
            type: Types.ACCESS_ERROR,
            payload: null,
            error,
        })
    }
}