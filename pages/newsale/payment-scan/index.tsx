"use client";

import { Container, Flex, Text, createStyles } from '@mantine/core';
import { erc20ABI } from '@wagmi/core';
import { useEffect } from 'react';
import QRCode from "react-qr-code";
import { useAccount, useContractRead } from "wagmi";
import Layout from '../../../components/layout';


const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: - 1,
  },
  link: {
    textDecoration: 'none',
    textDecorationColor: '#fff',
    color: '#fff'
  }
}));

import paymentFactoryABI from "../../../fixtures/PaymentFactory.json" assert { type: "json" };

export default function PaymentScan() {
  const { address } = useAccount();
  const paymentAddress = '0x6Ef06eF5e16613Be525F229DadAC2a930aD98489';

  const contract = useContractRead({
    address: '0xe7eD90d1EF91C23EE8531567419CC5554a4303b6',
    abi: paymentFactoryABI.abi,
    functionName: "getPaymentAddress",
    args: [],
  });
  console.log(contract);

  async function findSeller() {

  }

  useEffect(() => {
    findSeller();
  }, []);


  let mockData = {
    "qrcode_url": `ethereum:${paymentAddress}?value=5000000000`,
  }

  return (
    <>
      <Layout title="Scan to checkout">
        <Flex
          direction="column"
          justify="center"
          align="center"
          gap={30}
          mb={100}
        >
          <Text>
            To begin checkout, open the camera on your mobile device and scan the QR code below.
          </Text>
          <Container>
            <QRCode value={mockData.qrcode_url} size={400} />
          </Container>
        </Flex>
      </Layout >
    </>
  );
}
