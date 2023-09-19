import { Item } from "./item";

export type WalletStoreContext = {
  ethAddress: string;
  storeId: number;
  name: string;
  email: string;
  cart: Item[];
};
