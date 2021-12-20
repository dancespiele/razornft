import * as Types from "./types";
import { DispatchData } from '../../utils/utils.interfaces';

const initialState = {
  RAZORLeft: 0,
  rewards: "0",
  error: null,
  loading: false,
};

export const faucetReducer = (state = initialState, action: DispatchData<unknown>) => {
    switch (action.type) {
        case Types.FAUCET_CALC_REWARD: {
            return {
                ...state,
                rewards: action.payload as string,
                error: null,
                loading: false,
            }
        }

        case Types.FAUCET_GET_NFT: {
            return {
                ...state,
                error: null,
                loading: false,
            }
        }
        
        case Types.FAUCET_MINT_RZR: {
            return {
                ...state,
                error: null,
                loading: false,
            }
        }

        case Types.FAUCET_LOADING: {
            return {
              ...state,
              loading: true,
              error: null,
            };
          }
      
          case Types.FAUCET_ERROR: {
            return {
              ...state,
              error: action.error,
              loading: false,
            };
          }
      
          default: {
            return state;
          }
    }
}