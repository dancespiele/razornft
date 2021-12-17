import { methods } from '../../utils/helpers';
import { Methods, DispatchData } from '../../utils/utils.interfaces';
import { BalancePayload } from './tokens.interface';
import * as Types from './types'
import { Dispatch } from 'redux';

const tokenLoading = () => ({
    type: Types.TOKENS_LOADING,
});

export const getBalance = (address: string) => async (dispatch: Dispatch<DispatchData<BalancePayload> | {type: string}>) => {
    dispatch(tokenLoading());
    
    try {
        const balanceRAZOR = await (methods as Methods<number>).balanceOf(address, 0).call();
        const balanceRZR = await (methods as Methods<number>).balanceOf(address, 1).call();
    
        dispatch({
            type: Types.TOKENS_GET_BALANCE,
            payload: {
                balanceRAZOR,
                balanceRZR
            },
            error: null
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: Types.TOKENS_ERROR,
            payload: null,
            error,
        })
    }
}
