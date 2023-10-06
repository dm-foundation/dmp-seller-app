'use client';

import { buildPaymentConfirmationURL } from '@/lib/contract';
import classes from '@/pages/App.module.css';
import { Image, Flex, Loader, Text } from '@mantine/core';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { get, patch } from '@/api/api';

type OrderResponse = {
  amountInEth: number;
  amountInUSD: number;
  amountInUSDC: number;
  amountInWei: string;
  created_at: string;
  customer_email: string | null;
  id: number;
  orderItems: OrderItem[];
  paymentAddress: string;
  paymentCurrency: string;
  paymentFactoryAddress: string;
  paymentProof: string;
  paymentReceipt: string;
  paymentTransactionHash: string | null;
  status: string;
  storeId: number;
  updated_at: string;
};


type OrderItem = {
  id: number;
  itemId: number;
  orderId: number;
  quantity: number;
  storeId: number;
  unitPrice: number;
};

export default function Page() {
  const [etherscanConfirmation, setEtherscanConfirmation] = useState<any>({});
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const router = useRouter();
  let checkPaymentInterval: any;

  useEffect(() => {

    const updateOrderItemStockNumber = async (OrderResponse: OrderResponse, txHash: string) => {
      patch(`/order/${OrderResponse.id}/status`, { status: 'complete', paymentTransactionHash: txHash }).then(() => {
        OrderResponse.orderItems.map((orderItem: OrderItem) => {
          console.log("Updating order item stock quantity: ", orderItem.itemId, orderItem.quantity);
          patch(`/item/${orderItem.itemId}/subtract-unit-item`, { id: orderItem.itemId, quantity: orderItem.quantity });
        });
      }).catch((err) => {
        console.log(err);
      });
    }

    const fetchOrderConfirmationOnEtherscan = async () => {
      const paymentConfirmationURL = buildPaymentConfirmationURL(router.query.slug as string);
      console.log('paymentConfirmationURL: ', paymentConfirmationURL);
      const paymentTransactionData = await axios.get(paymentConfirmationURL, {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      setEtherscanConfirmation(paymentTransactionData.data);
      return paymentTransactionData.data;
    }

    const processOrderConfirmation = async () => {
      try {
        const orderResponseString = localStorage.getItem('orderResponse');
        const orderResponse: OrderResponse = JSON.parse(orderResponseString || '{}');
        if (!orderResponse) {
          console.log("Order lost in localStorage!");
          return;
        }

        const orderDB = await get(`/order/${orderResponse.id}`);
        console.log("etherscanConfirmation", etherscanConfirmation);
        console.log("orderDB: ", orderDB);
        if (orderDB?.status === 'pending') {
          const etherscanResult = await fetchOrderConfirmationOnEtherscan();
          console.log("Order has not been confirmed in the database yet")
          if (etherscanResult?.status == 1) {
            console.log("Order has been confirmed on Etherscan!", etherscanConfirmation)
            updateOrderItemStockNumber(orderResponse, etherscanResult.result[0].hash);
            // localStorage.removeItem('orderResponse');
          } else {
            console.log("Order is still pending on Etherscan!", etherscanConfirmation)
          }
        } else {
          console.log("Order has already been confirmed in the database!")
          setEtherscanConfirmation({ result: [{ hash: orderDB.paymentTransactionHash }] });
          setOrderConfirmation(true);
          clearInterval(checkPaymentInterval);
        }
      } catch (err) {
        console.log(err);
      }
    }

    checkPaymentInterval = setInterval(() => {
      processOrderConfirmation();
    }, 7000, 1000);

  }, [router.query.slug]);

  return (
    <>
      <Layout title="Transaction">
        <Flex direction="column" justify="center" align="center">
          {!orderConfirmation && (
            <>
              <Loader color="black" />
              <h2>Pending transaction..</h2>
              <Text>Transaction will likely process in less than 30 seconds.</Text>
            </>
          )}

          {orderConfirmation && (
            <>
              <Image
                radius="md"
                h={200}
                w="auto"
                fit="contain"
                src="../../../green-checkmark-icon.png"
              />
              <h2>Transaction complete</h2>
              <Text mb={20}>Your transaction has been confirmed.</Text>
              <Link
                className={classes.link_transaction_confirmation}
                href={`https://sepolia.etherscan.io/tx/${etherscanConfirmation?.result[0]?.hash}`}
              >
                View on Block Explorer
              </Link>
            </>
          )}
        </Flex>
      </Layout>
    </>
  );
}
