"use client";

import { AppContext } from '@/context';
import { Container, Flex, Text, createStyles } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { useContractRead } from "wagmi";
import Layout from '../../../components/layout';
import paymentFactoryABI from "../../../fixtures/PaymentFactory.json" assert { type: "json" };
import { encode, decode } from '@ipld/dag-cbor'
import { buildPaymentContractParams, hashData, PaymentFactoryContractAddress, PaymentFactoryFunctionName } from '@/lib/utils';
import { Item } from '@/types/item';
import { ethers } from 'ethers';
let currency = require('currency.js');
const CryptoConvert = require("crypto-convert").default;

export default function PaymentScan() {
  const { walletStoreContext } = useContext(AppContext);
  const storePaymentAddress = walletStoreContext?.ethAddress || "0x0000000000000000000000000000000000000000";
  const paymentAmount: string = BigInt(walletStoreContext?.cart.reduce((acc, item: Item) => item.amount > 0 ? acc + (item.price * Number(item.amount)) : acc, 0) || 0).toString();

  const [amountInEth, setAmountInEth] = useState<string>("");
  const [hashedData, setHashedData] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (walletStoreContext?.cart) {
        const serializedSaleData = encode(JSON.stringify(walletStoreContext?.cart));
        let data = await hashData(serializedSaleData)
        let hexHashedData = Buffer.from(data).toString('hex');
        setHashedData(hexHashedData);
      }
    }

    const fetchUSDEth = async (amountInUSD: string) => {
      const convert = new CryptoConvert();
      await convert.ready();
      const convertedAmount = convert.USD.ETH(amountInUSD)
      console.log(convertedAmount);
      setAmountInEth(convertedAmount);
    }

    fetchUSDEth(paymentAmount);
    fetchData();
  }, [])

  const calculateAmountInWei = function (amountInEth: string) {
    return (currency(amountInEth, { precision: 8 }).multiply(1000000000000000000)).value;
  }

  const params = buildPaymentContractParams(storePaymentAddress, calculateAmountInWei(amountInEth), `0x${hashedData}`);
  if (process.env.DEBUG) console.log("[DEBUG] buildPaymentContractParams:", params);
  const contract = useContractRead({
    address: PaymentFactoryContractAddress,
    abi: paymentFactoryABI.abi,
    functionName: PaymentFactoryFunctionName,
    args: params
  });

  let amountInWei = calculateAmountInWei(amountInEth);
  const qrCodeURL = `ethereum:${contract.data}?value=${amountInWei.toString()}`

  /* [TODO]
    - Adjust transaction model to include fields for saving the information below
    - Save:
        - contents of cart (walletStoreContext?.cart) in the database
        - amount in WEI (amountInWei) passed to contract in the database
        - hashed data (`0x${hashedData}`) in the database
        - contract payment address  (contract.data) in the database
  */

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

