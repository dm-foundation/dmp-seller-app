import { WalletContext } from '@/types/walletAddress';
import { createContext } from 'react';

export type ContextType = {
  walletContext: WalletContext | null;
  updateContext: (ctx: WalletContext ) => Promise<WalletContext>;
};

export const AppContext = createContext<ContextType>(null!);
