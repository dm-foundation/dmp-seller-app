import { Flex, Loader } from '@mantine/core';
import Layout from '../../components/layout';
import TransactionItem from '../../components/transaction-item/transaction-item';
import { get } from '@/api/api';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context';

export type ItemProps = {
  id: number;
  name: string;
  sku: string;
  price: number;
  units: number;
  thumbnail: string;
  storeId: number;
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

export default function Transactions() {
  const { walletStoreContext, updateContext } = useContext(AppContext);
  const [orders, setOrders] = useState<TransactionProps[]>([]);

  const fetchTransations = async () => {
    try {
      const response = await get(`/store/${walletStoreContext?.storeId}/store-orders-items`);
      setOrders(response);

      
    } catch (error) {}
  };

  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    const loadingTransations = async () => {
      await fetchTransations();
      setLoad(true);
    };

    if (!isLoad) loadingTransations();
  }, [isLoad]);

  return (
    <Layout title="Transactions">
      <Flex direction="column" justify="center" align="center" mb={100}>
        {!isLoad && <Loader size={30} />}
        {orders.map((order) => (
          <TransactionItem
            key={order.id}
            seller_name={order.customer_email}
            priceUSD={order.amountInUSD}
            transaction_timestamp={new Date(order.created_at)}
            orders={orders}
            id={order.id}
          />
        ))}
      </Flex>
    </Layout>
  );
}
