import { methods, web3 } from '../../utils/helpers';
import { Methods } from '../../utils/utils.interfaces';
import * as Types from './types';
import { Dispatch } from 'redux';

const faucetLoading = () => ({
    type: Types.FAUCET_LOADING,
});

export const calcReward = (address: string) => async (dispatch: Dispatch) => {
    dispatch(faucetLoading());

    try {
        const rewards = await (methods as Methods<number>).calcReward(address).call();

        dispatch({
            type: Types.FAUCET_CALC_REWARD,
            payload: web3.utils.fromWei(rewards.toString(), 'ether'),
            error: null,
        });
    } catch(error) {
        console.error(error);
        dispatch({
            type: Types.FAUCET_ERROR,
            payload: null,
            error,
        });
    }
}

export const getNFT = (address: string) => async (dispatch: Dispatch) => {
    dispatch(faucetLoading());

    try {
        await (methods as Methods<void>).faucetNFT().send({ from: address});

        dispatch({
            type: Types.FAUCET_GET_NFT,
            error: null,
        })
    } catch (error) {
        console.error(error);
        dispatch({
            type: Types.FAUCET_ERROR,
            payload: null,
            error,
        });
    }
}

export const claimRZR = (address: string) => async (dispatch: Dispatch) => {
    dispatch(faucetLoading());

    try {
        await (methods as Methods<void>).mintRZR().send({ from: address});

        dispatch({
            type: Types.FAUCET_MINT_RZR,
            error: null,
        })
    } catch (error) {
        console.error(error);
        dispatch({
            type: Types.FAUCET_ERROR,
            payload: null,
            error,
        });
    }
}