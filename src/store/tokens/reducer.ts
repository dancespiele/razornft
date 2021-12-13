import * as Types from "./types";
import { DispatchData } from '../../utils/utils.interfaces';
import { BalancePayload } from './tokens.interface';

const initialState = {
  balances: {
    balanceRAZOR: 0,
    balanceRZR: 0,
  },
  error: null,
  loading: false,
};

export const tokensReducer = (state = initialState, action: DispatchData<BalancePayload>) => {
  switch (action.type) {
    case Types.GET_BALANCE: {
      return {
        ...state,
        balances: action.payload,
        error: null,
        loading: false,
      };
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