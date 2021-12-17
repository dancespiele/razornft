import { methods } from '../../utils/helpers';
import { Methods } from '../../utils/utils.interfaces';
import * as Types from './types';
import { Dispatch } from 'redux';
import { formatBytes32String } from '@ethersproject/strings';

const accessLoading = () => ({
    type: Types.ACCESS_LOADING,
});

export const checkRole = (role: string, address: string) => async (dispatch: Dispatch) => {
    dispatch(accessLoading());

    try {
        const hasRole = await (methods as Methods<boolean>).hasRole(formatBytes32String(role), address);

        dispatch({
            type: Types.ACCESS_HAS_ROLE,
            payload: {
                hasRole,
            },
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