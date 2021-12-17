export interface FaucetState {
    rewards: number;
    error: Error;
    loading: boolean;
}

export interface Faucet {
    faucet: FaucetState;
}