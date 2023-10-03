import TransactionDetails from '@/components/transaction-details/transaction-details';
import { AppContext } from '@/context';
import { Flex, Loader } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../../components/layout';

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
  amountInUSDC: number;
  items: ItemProps[];
  paymentProof: string;
  paymentFactoryAddress: string;
  paymentAddress: string;
  paymentTransactionHash: string;
  paymentReceipt: string;
  created_at: Date;
};

export default function TransactionDetail() {
  const { orderContext } = useContext(AppContext);
  const [order, setOrder] = useState<any>([]);

  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      setOrder(orderContext)
      isLoading(true)
    }

    if (!loading) loadOrder()
  }, [])

  console.log(orderContext);

  return (
    <Layout title="Transaction Details">
      <Flex direction="column" justify="center" align="center" mb={100}>
        {!loading && <Loader size={30} />}
        <TransactionDetails key={order.id} order={order} />
      </Flex>
    </Layout>
  );
}
