
export interface Methods<T> {
    balanceOf: (address: string, tokenId: number) => this;
    call: () => T;
}

export interface DispatchData<T> {
    type: string;
    payload: T;
    error: Error;
}