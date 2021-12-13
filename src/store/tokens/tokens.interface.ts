export interface TokensState {
    balances: BalancePayload;
    error: Error;
    loading: boolean;
}

export interface BalancePayload {
    balanceRAZOR: number;
    balanceRZR: number;
}

export interface Tokens {
    tokens: TokensState;
}