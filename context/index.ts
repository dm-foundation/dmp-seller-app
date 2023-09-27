import { WalletStoreContext } from '@/types/wallet-store.context';
import { createContext } from 'react';
import { OrderContext } from '@/types/order.context';

export type ContextType = {
  walletStoreContext: WalletStoreContext | null;
  updateContext: (ctx: WalletStoreContext ) => Promise<WalletStoreContext>;
  orderContext: OrderContext | null;
  updateCtxOrder: (ctx: OrderContext) => Promise<OrderContext>
};

export const AppContext = createContext<ContextType>(null!);
