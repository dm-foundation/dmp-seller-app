"use client";

import { buildPaymentConfirmationURL } from '@/lib/contract';
import classes from '@/pages/App.module.css';
import { Avatar, Flex, Loader, Text } from '@mantine/core';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../../components/layout';

export default function Page() {

  const [transactionConfirmation, setTransactionConfirmation] = useState<any>({});
  const [transactionStatus, setTansactionStatus] = useState("PENDING");
  const router = useRouter();

  useEffect(() => {
    const fetchTransactionConfirmation = async () => {
      const paymentConfirmationURL = buildPaymentConfirmationURL(router.query.slug as string);

      console.log("paymentConfirmationURL: ", paymentConfirmationURL);
      const paymentTransactionData = await axios.get(paymentConfirmationURL, {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });

      console.log("paymentTransactionData.data: ", paymentTransactionData.data);
      setTransactionConfirmation(paymentTransactionData.data);
    }

    setInterval(() => {
      fetchTransactionConfirmation();
    }, 7000)
  }, [router.query.slug])

  return (
    <>
      <Layout title="Transaction" >
        <Flex
          direction="column"
          justify="center"
          align="center"
        >
          {
            transactionConfirmation?.status !== '1' &&
            <>
              <Loader color="black" />
              <h2>
                Pending transaction..
              </h2>
              <Text>
                Transaction will likely process in less than 30 seconds.
              </Text>
            </>
          }

          {
            transactionConfirmation?.status === '1' &&
            <>
              <Avatar variant="light" radius="xs" size="lg" src="../green-checkmark-icon.png" />
              <h2>
                Transaction complete
              </h2>
              <Text mb={20} >
                Your transaction has been confirmed.
              </Text>
              <Link className={classes.link_transaction_confirmation} href={`https://sepolia.etherscan.io/tx/${transactionConfirmation.result[0].hash}`} >
                View on Block Explorer
              </Link>
            </>
          }
        </Flex>
      </Layout >
    </>
  );
}