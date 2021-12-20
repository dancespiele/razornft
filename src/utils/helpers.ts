import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import razorABI from '../contracts/Razor.json'

export const RAZOR_ADDRESS = process.env.CONTRACT_ADDRESS;
export const OWNER_ADDRESS = process.env.OWNER_ADDRESS;

const getWeb3 = () => {
  if(window.ethereum) {
    return new Web3(window.ethereum);
  } else if(window.web3) {
    return window.web3;
  } else {
    return new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));
  }
}

export const web3 = getWeb3();
export const methods = new web3.eth.Contract(razorABI.abi as AbiItem[], RAZOR_ADDRESS).methods;

export const setAddressWalletString = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(-3, address.length)}`;
}