import { useSelector } from 'react-redux';
import { Faucet } from './faucet.interface';

export const useFaucet = () => useSelector<Faucet>((state) => state.faucet);