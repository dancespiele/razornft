import { methods, RAZOR_ADDRESS, web3 } from '../../utils/helpers';
import { Methods } from '../../utils/utils.interfaces';
import * as Types from './types';
import { Dispatch } from 'redux';

const tokenLoading = () => ({
    type: Types.TOKENS_LOADING,
});

export const getBalance = (address: string) => async (dispatch: Dispatch ) => {
    dispatch(tokenLoading());
    
    try {
        const balanceRAZOR = await (methods as Methods<number>).balanceOf(address, 0).call();
        const balanceRZR = await (methods as Methods<number>).balanceOf(address, 1).call();
    
        dispatch({
            type: Types.TOKENS_GET_BALANCE,
            payload: {
                address,
                balanceRAZOR,
                balanceRZR: web3.utils.fromWei(balanceRZR.toString(), "ether"),
            },
            error: null
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: Types.TOKENS_ERROR,
            error,
        });
    }
}

export const getWalletAddress = () => async (dispatch: Dispatch) => {
    dispatch(tokenLoading());

    try {
       const walletAddress = await web3.eth.getAccounts();

       dispatch({
           type: Types.TOKENS_GET_WALLET_ADDRESS,
           payload: walletAddress?.[0],
           error: null,
       });
    } catch (error) {
        console.error(error);
        dispatch({
            type: Types.TOKENS_ERROR,
            error,
        });
    }
}

export const approveToken = (address: string) => async (dispatch: Dispatch) => {
    dispatch(tokenLoading());

    try {
        const response = await (methods as Methods<void>).setApprovalForAll(RAZOR_ADDRESS, true).send({from: address});
        console.log(response);

        dispatch({
            type: Types.TOKENS_APPROVE,
            payload: null,
            error: null,
        });
    } catch (error) {
        dispatch({
            type: Types.TOKENS_ERROR,
            error,
        });
    }
}

export const isApproved = (address: string) => async (dispatch: Dispatch ) => {
    dispatch(tokenLoading());

    try {
        const isApproved = await (methods as Methods<boolean>).isApprovedForAll(address, RAZOR_ADDRESS).call();

        dispatch({
            type: Types.TOKENS_IS_APPROVED,
            payload: isApproved,
            error: null,
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: Types.TOKENS_ERROR,
            error: error,
        });
    }
}

