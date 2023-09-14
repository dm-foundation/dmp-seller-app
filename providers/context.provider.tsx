import fetch from '@/api/api';
import { AppContext } from '@/context';
import { WalletContext } from '@/types/walletAddress';
import { useState } from 'react';

export const ContextProvider = ({ children }: { children: JSX.Element }) => {
  const [walletContext, setWalletContext] = useState<WalletContext | null>(null);

  const updateContext = async (ctx: WalletContext) => {
    try {
      const data = await fetch(`/wallet-address/${ctx.eth_address}`);

      if (data) {
        ctx.id_store = data.id_store;
        setWalletContext(ctx);
      }
      return ctx;
    } catch (error) {
      console.error(ctx);
      return ctx;
    }
  };

  return (
    <AppContext.Provider value={{ walletContext, updateContext }}>{children}</AppContext.Provider>
  );
};
