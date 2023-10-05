'use client';

import { buildPaymentConfirmationURL } from '@/lib/contract';
import classes from '@/pages/App.module.css';
import { Image, Flex, Loader, Text } from '@mantine/core';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { patch } from '@/api/api';

type orderResponse = {
  amountInEth: number;
  amountInUSD: number;
  amountInUSDC: number;
  amountInWei: string;
  created_at: string;
  customer_email: string | null;
  id: number;
  orderItems: orderItem[];
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


type orderItem = {
  id: number;
  itemId: number;
  orderId: number;
  quantity: number;
  storeId: number;
  unitPrice: number;
};

export default function Page() {
  const [transactionConfirmation, setTransactionConfirmation] = useState<any>({});
  const [transactionStatus, setTansactionStatus] = useState('PENDING');
  const router = useRouter();
  let checkPaymentInterval: any;

  useEffect(() => {
    const fetchTransactionConfirmation = async () => {
      const paymentConfirmationURL = buildPaymentConfirmationURL(router.query.slug as string);
      console.log('router.query.slug: ', router.query.slug);
      console.log('paymentConfirmationURL: ', paymentConfirmationURL);
      const paymentTransactionData = await axios.get(paymentConfirmationURL, {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          // 'Access-Control-Allow-Origin': '*',
          // 'X-Frame-Options': 'SAMEORIGIN',
        },
      });

      console.log('paymentTransactionData: ', paymentTransactionData);
      setTransactionConfirmation(paymentTransactionData.data);
      setTansactionStatus('COMPLETE');

      if (transactionStatus === 'COMPLETE') {
        const orderResponseString = localStorage.getItem('orderResponse');
        const orderResponse: orderResponse = JSON.parse(orderResponseString || '{}');

        patch(`/order/${orderResponse.id}/status`, { status: 'complete' }).then(() => {
          orderResponse.orderItems.map((orderItem: orderItem) => {
            patch(`/item/${orderItem.id}/subtract-unit-item`, orderItem.quantity);
          });
        }).catch((err) => {
          console.log(err);
        });


      }
      clearInterval(checkPaymentInterval);
    };

    if (transactionStatus !== 'COMPLETE') {
      checkPaymentInterval = setInterval(() => {
        fetchTransactionConfirmation();
      }, 7000);
    }
  }, [router.query.slug]);

  return (
    <>
      <Layout title="Transaction">
        <Flex direction="column" justify="center" align="center">
          {transactionConfirmation?.status !== '1' && (
            <>
              <Loader color="black" />
              <h2>Pending transaction..</h2>
              <Text>Transaction will likely process in less than 30 seconds.</Text>
            </>
          )}

          {transactionConfirmation?.status === '1' && (
            <>
              <Image
                radius="md"
                h={200}
                w="auto"
                fit="contain"
                src="../../green-checkmark-icon.png"
              />
              <h2>Transaction complete</h2>
              <Text mb={20}>Your transaction has been confirmed.</Text>
              <Link
                className={classes.link_transaction_confirmation}
                href={`https://etherscan.io/tx/${transactionConfirmation.result[0].hash}`}
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
