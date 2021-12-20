export interface FaucetState {
    rewards: string;
    error: Error;
    loading: boolean;
}

export interface Faucet {
    faucet: FaucetState;
}