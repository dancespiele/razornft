import { methods } from '../../utils/helpers';
import { Methods } from '../../utils/utils.interfaces';
import * as Types from './types';
import { Dispatch } from 'redux';

const faucetLoading = () => ({
    type: Types.FAUCET_LOADING,
});

export const calcReward = () => async (dispatch: Dispatch) => {
    dispatch(faucetLoading());

    try {
        const rewards = await (methods as Methods<number>).calcReward().call();

        dispatch({
            type: Types.FAUCET_CALC_REWARD,
            payload: {
                rewards,
            },
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

export const getFNT = () => async (dispatch: Dispatch) => {
    dispatch(faucetLoading());

    try {
        await (methods as Methods<void>).faucetNFT().call();

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

export const mintNFT = () => async (dispatch: Dispatch) => {
    dispatch(faucetLoading());

    try {
        await (methods as Methods<void>).mintRZR().call();

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