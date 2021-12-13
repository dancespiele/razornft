export const setLocalStorage = (address: string) => {
    window.localStorage.setItem('wallet', address);
};

export const getLocalStorage = (): string => {
    return window.localStorage.getItem('wallet');
}

export const deleteLocalStorage = () => {
    window.localStorage.removeItem('wallet');
}