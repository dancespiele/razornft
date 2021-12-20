import * as Types from "./types";
import { DispatchData } from '../../utils/utils.interfaces';
import { BalancePayload } from './tokens.interface';

const initialState = {
  walletAddress: '',
  approved: false,
  balances: [] as BalancePayload[],
  error: null,
  loading: false,
};

export const tokensReducer = (state = initialState, action: DispatchData<unknown>) => {
  switch (action.type) {
    case Types.TOKENS_GET_BALANCE: {
      return {
        ...state,
        balances: [...state.balances.filter(balance => balance.address !== (action.payload as BalancePayload).address), action.payload],
        error: null,
        loading: false,
      };
    }

    case Types.TOKENS_GET_WALLET_ADDRESS: {
        return {
          ...state,
          walletAddress: action.payload as string,
          error: null,
          loading: false,
        }
    }

    case Types.TOKENS_SEND_TRANSFER: {
      return {
        ...state,
        error: null,
        loading: false,
      }
    }

    case Types.TOKENS_IS_APPROVED: {
      return {
        ...state,
        approved: action.payload as boolean,
        error: null,
        loading: false,
      }
    }

    case Types.TOKENS_APPROVE: {
      return {
        ...state,
        error: null,
        loading: false,
      }
    }

    case Types.TOKENS_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case Types.TOKENS_ERROR: {
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