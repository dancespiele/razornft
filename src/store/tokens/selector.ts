import { useSelector } from 'react-redux';
import { Tokens } from './tokens.interface';

export const useTokens = () => useSelector<Tokens>((state) => state.tokens);