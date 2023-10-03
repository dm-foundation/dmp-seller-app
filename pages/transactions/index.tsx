import { get } from '@/api/api';
import { AppContext } from '@/context';
import classes from '@/pages/App.module.css';
import { Flex, Loader } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout';
import TransactionItem from '../../components/transaction-item/transaction-item';

export type ItemProps = {
  id: number;
  name: string;
  sku: string;
  unitPrice: number;
  quantity: number;
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
  const { walletStoreContext } = useContext(AppContext);
  const [orders, setOrders] = useState<TransactionProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchStoreTransactions = async () => {
      try {
        setLoading(true);
        const storeOrderItemData = await get(`/store/${walletStoreContext?.storeId}/store-orders-items`);
        console.log("orders", orders);
        setOrders(storeOrderItemData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching API data from store", `/store/${walletStoreContext?.storeId}/store-orders-items`, error)
      }
    };

    setTimeout(() => fetchStoreTransactions(), 500)

  }, []);

  return (
    <Layout title="Transactions">
      <Flex direction="column" justify="center" align="center" mb={100}>
        {loading &&
          <>
            <Loader size={40} color='#000' />
            <p className={classes.error}>Loading past transactions data...</p>
          </>
        }
        {/* {!loading && orders.length == 0 && <p className={classes.error}>No past transactions found.</p>} */}
        {!loading && orders.map((order) => (
          <TransactionItem
            key={order.id}
            sellerName={order.customer_email}
            priceUSD={order.amountInUSD}
            transactionTimestamp={new Date(order.created_at)}
            orders={orders}
            id={order.id}
          />
        ))}
      </Flex>
    </Layout>
  );
}
