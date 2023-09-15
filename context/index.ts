import { WalletStoreContext } from '@/types/wallet-store.context';
import { createContext } from 'react';

export type ContextType = {
  walletStoreContext: WalletStoreContext | null;
  updateContext: (ctx: WalletStoreContext ) => Promise<WalletStoreContext>;
};

export const AppContext = createContext<ContextType>(null!);
