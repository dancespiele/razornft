import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Methods } from '../utils/utils.interfaces';

export const RAZOR_ADDRESS = "0xbb7ae00a9E8f8749F8D1671CCcFca2EC0a5d7b68";

export const razorABI: AbiItem[] = [
    {
      constant:true,
      inputs:[{name:"","type":"address"}, {name: "", type: "uint256"}],
      name:"balanceOf",
      outputs:[{"name":"balance","type":"uint256"}],
      type:"function"
    },
]

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));
export const methods = new web3.eth.Contract(razorABI, RAZOR_ADDRESS).methods;

export const setAddressWalletString = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(-3, address.length)}`
}