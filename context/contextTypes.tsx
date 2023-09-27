export interface IContext {
    storeId: number;
    storeName: string;
    storeEmail: string;
    ethAddress: string;
}
export interface IItem {
    id: number;
    name: string;
    sku: string;
    price: number;
    units: number;
    thumbnail: string;
    storeId: number;
    created_at: Date;
  };
  
  export interface ITransaction {
    id: number;
    customer_email: string;
    storeId: number;
    amountInUSD: number;
    amountInEth: number;
    amountInWei: number;
    items: IItem[];
    paymentFactoryAddress: string;
    paymentAddress: string;
    paymentTransactionHash: string;
    hashedCart: string;
    created_at: Date;
  };

export type ContextType = {
    ctx: IContext;
    updateCtx: (ctx: IContext) => IContext;
    ctxOrder: ITransaction;
    updateCtxOrder: (ctx: ITransaction) => Promise<ITransaction>;
};
