import { ItemContext } from "./item.context";

export type OrderContext = {
    id: number;
    customer_email: string;
    storeId: number;
    amountInUSD: number;
    amountInEth: number;
    amountInWei: number;
    items: ItemContext[];
    paymentFactoryAddress: string;
    paymentAddress: string;
    paymentTransactionHash: string;
    hashedCart: string;
    created_at: Date;
  };