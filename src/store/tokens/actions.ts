import {razorABI, RAZOR_ADDRESS, methods} from '../../utils/helpers';
import { Methods, DispatchData } from '../../utils/utils.interfaces';
import { BalancePayload } from './tokens.interface';
import * as Types from './types'
import { Dispatch } from 'redux';

export const getBalance = (address: string) => async (dispatch: Dispatch<DispatchData<BalancePayload>>) => {
    try {
        const balanceRAZOR = await (methods as Methods<number>).balanceOf(address, 0).call();
        const balanceRZR = await (methods as Methods<number>).balanceOf(address, 1).call();
    
        dispatch({
            type: Types.GET_BALANCE,
            payload: {
                balanceRAZOR,
                balanceRZR
            },
            error: null
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: Types.TOKENS_ERROR,
            payload: null,
            error,
        })
    }
}