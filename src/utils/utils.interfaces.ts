export interface Methods<T> {
    balanceOf: (address: string, tokenId: number) => this;
    hasRole: (role: string, address: string) => this;
    calcReward: () => this;
    faucetNFT: () => this;
    mintRZR: () => this;
    call: () => T;
}

export interface DispatchData<T> {
    type: string;
    payload: T;
    error: Error;
}