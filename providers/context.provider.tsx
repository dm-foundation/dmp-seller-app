import { AppContext } from '@/context';
import { WalletStoreContext } from '@/types/wallet-store.context';
import { useState } from 'react';

export const ContextProvider = ({ children }: { children: JSX.Element }) => {
  const [walletStoreContext, setWalletStoreContext] = useState<WalletStoreContext | null>(null);

  const updateContext = async (ctx: WalletStoreContext) => {
    try {
      setWalletStoreContext(ctx);
      return ctx;
    } catch (error) {
      console.error(ctx);
      return ctx;
    }
  };

  return (
    <AppContext.Provider value={{ walletStoreContext, updateContext }}>{children}</AppContext.Provider>
  );
};
