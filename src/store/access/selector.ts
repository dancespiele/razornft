import { useSelector } from 'react-redux';
import { Access } from './access.interface';

export const useAccess = () => useSelector<Access>((state) => state.access);
