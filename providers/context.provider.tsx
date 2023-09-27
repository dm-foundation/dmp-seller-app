import { AppContext } from '@/context';
import { OrderContext } from '@/types/order.context';
import { WalletStoreContext } from '@/types/wallet-store.context';
import { useState } from 'react';

export const ContextProvider = ({ children }: { children: JSX.Element }) => {
  const [walletStoreContext, setWalletStoreContext] = useState<WalletStoreContext | null>(null);
  const [orderContext, setOrderContext] = useState<OrderContext | null>(null);

  const updateContext = async (ctx: WalletStoreContext) => {
    try {
      setWalletStoreContext(ctx);
      return ctx;
    } catch (error) {
      console.error('[ERROR] Context: could not be updated', ctx);
      return ctx;
    }
  };

  const updateCtxOrder = async (ctx: OrderContext) => {
    try {
      setOrderContext(ctx);
      return ctx;
    } catch (error) {
      console.error('[ERROR] Context: could not be updated', ctx);
      return ctx;
    }
  };

  return (
    <AppContext.Provider
      value={{ walletStoreContext, updateContext, orderContext, updateCtxOrder }}
    >
      {children}
    </AppContext.Provider>
  );
};
