"use client";

import { publicClient } from '@/lib/crypto_client';
import classes from '@/pages/App.module.css';
import { Avatar, Flex, Loader, Text } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../../../components/layout';

export default function PaymentConfirmation() {
  const [transactionStatus, setTransactionStatus] = useState<string | undefined>("PENDING");
  const [transactionConfirmation, setTransactionConfirmation] = useState({});
  const amountInETH = 0.0015

  useEffect(() => {
    const fetchTransactionConfirmation = async () => {
      const confirmation = await publicClient.getTransactionReceipt({
        hash: '0xefce86024445ef3cfce8f91fb633fe39e7b324ff9e46317d47faf28491d9e591'
        // hash: '0x45cF22EE622FBaf7c9ad0F05b5CbeE850c725667'
      })
      console.log("confirmation: ", confirmation);
      setTransactionConfirmation(confirmation);
    }
    fetchTransactionConfirmation();
  }, [])

  console.log(transactionConfirmation);

  return (
    <>
      <Layout title="Transaction">
        <Flex
          direction="column"
          justify="center"
          align="center"
        >
          {transactionStatus === 'PENDING' &&
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
          {transactionStatus === 'COMPLETE' &&
            <>
              <Avatar variant="light" radius="xs" size="lg" src="../green-checkmark-icon.png" />
              <h2>
                Transaction complete
              </h2>
              <Text mb={20}>
                Your transaction of {amountInETH} ETH has been confirmed.
              </Text>
              <Link className={classes.link_transaction_confirmation} href={''}>
                View on Block Explorer
              </Link>
            </>
          }
        </Flex>
      </Layout >
    </>
  );
}

