import { Flex, Loader } from '@mantine/core';
import Layout from '../../../components/layout';
import TransactionItem from '../../../components/transaction-item/transaction-item';
import { get } from '@/api/api';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context';
import TransactionDetails from '@/components/transaction-details/transaction-details';

export type ItemProps = {
  id: number;
  name: string;
  sku: string;
  price: number;
  units: number;
  thumbnail: string;
  storeId: number;
  amount: number;
  created_at: Date;
};

export type TransactionProps = {
  id: number;
  customer_email: string;
  storeId: number;
  amountInUSD: number;
  amountInEth: number;
  amountInWei: number;
  items: ItemProps[];
  paymentFactoryAddress: string;
  paymentAddress: string;
  paymentTransactionHash: string;
  hashedCart: string;
  created_at: Date;
};

export default function TransactionDetail() {
  const { walletStoreContext, updateContext, orderContext } = useContext(AppContext);
  const [orders, setOrders] = useState<any>([]);


  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    const loadingTransations = async () => {
        setOrders(orderContext)

        setLoad(true)
    }

    if(!isLoad) loadingTransations()
  },[isLoad])


  console.log("orders")

console.log(orderContext)

  return (
    <Layout title="Transaction Details">
      <Flex direction="column" justify="center" align="center" mb={100}>
        {!isLoad && <Loader size={30} />}
        <TransactionDetails orders={orders}/>
      </Flex>
    </Layout>
  );
}
