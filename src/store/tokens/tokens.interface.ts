export interface TokensState {
    approved: boolean;
    balances: BalancePayload[];
    error: Error;
    loading: boolean;
}

export interface BalancePayload {
    address: string;
    balanceRAZOR: number;
    balanceRZR: string;
}

export interface Tokens {
    tokens: TokensState;
}