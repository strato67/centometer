import { StockInfo } from '@/components/stock/stockType';
import { createContext } from 'react';

export const StockContext = createContext<StockInfo>({});
export const LoadingContext = createContext<boolean>(true)