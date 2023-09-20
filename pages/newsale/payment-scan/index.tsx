"use client";

import { AppContext } from '@/context';
import { Container, Flex, Text, createStyles } from '@mantine/core';
import { useContext, useEffect } from 'react';
import QRCode from "react-qr-code";
import { useContractRead } from "wagmi";
import Layout from '../../../components/layout';
import paymentFactoryABI from "../../../fixtures/PaymentFactory.json" assert { type: "json" };
import { encode, decode } from '@ipld/dag-cbor'
import { sha256 } from "multiformats/hashes/sha2";


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

async function hashData(data: Uint8Array): Promise<Uint8Array> {
  let sha256Hasher = await sha256.digest(data);
  console.log(sha256Hasher.digest);
  return sha256Hasher.digest;
}

export default function PaymentScan() {
  const { walletStoreContext } = useContext(AppContext);
  const storePaymentAddress = walletStoreContext?.ethAddress || "0x0000000000000000000000000000000000000000";

  const PaymentFactoryContractAddress = "0xe7eD90d1EF91C23EE8531567419CC5554a4303b6";
  const PaymentFactoryFunctionName = "getPaymentAddress";

  // args
  const PaymentProof = "0x0000000000000000000000000000000000000000" // Blank proof
  const Amount = 20 // in USDC
  const Currency = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" // USDC

  if (walletStoreContext?.cart) {
    let contractData = JSON.stringify(walletStoreContext?.cart);
    console.log("walletStoreContext?.cart: ", contractData);

    const serializedSaleData = encode(contractData);

    console.log('encoded:', serializedSaleData);
    console.log('decoded:', decode(serializedSaleData));

    const hashedData = hashData(serializedSaleData);
    const receiptHash: string = Buffer.from(hashedData.toString()).toString('hex');
    console.log('receiptHash:', receiptHash);
    const finalReceiptHash = `0x${receiptHash}${'0'.repeat(64 - receiptHash.length - 1)}`;
    console.log('finalReceiptHash:', finalReceiptHash);

    const contract = useContractRead({
      address: PaymentFactoryContractAddress,
      abi: paymentFactoryABI.abi,
      functionName: PaymentFactoryFunctionName,
      args: [
        storePaymentAddress,
        PaymentProof,
        Amount,
        Currency,
        finalReceiptHash
      ],
    });
    console.log("contract:", contract);
  }

  const qrCodeURL = `ethereum:${storePaymentAddress}?value=5000000000`

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
          {
            !walletStoreContext?.cart ?
              <p>
                Cart is empty!
              </p>
              :
              <><Text>
                To begin checkout, open the camera on your mobile device and scan the QR code below.
              </Text>
                <Container>
                  <QRCode value={qrCodeURL} size={400} />
                </Container>
              </>
          }
        </Flex>
      </Layout >
    </>
  );
}

