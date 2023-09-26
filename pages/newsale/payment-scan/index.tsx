"use client";

import { AppContext } from '@/context';
import { PaymentFactoryContractAddress, PaymentFactoryFunctionName, buildPaymentConfirmationURL, buildPaymentContractParams } from '@/lib/contract';
import CryptoConverter from '@/lib/currency';
import { sha256Hasher } from '@/lib/hashing';
import { Item } from '@/types/item';
import { encode } from '@ipld/dag-cbor';
import { Container, Flex, Text } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { useContractRead } from "wagmi";
import Layout from '../../../components/layout';
import paymentFactoryABI from "../../../fixtures/PaymentFactory.json" assert { type: "json" };
import { post } from '@/api/api';
import axios from 'axios';
import PaymentConfirmation from '../payment-confirmation';


export default function PaymentScan() {
  const [error, setError] = useState<string | undefined>(undefined);

  const { walletStoreContext } = useContext(AppContext);
  const storePaymentAddress = walletStoreContext?.ethAddress || "0x0000000000000000000000000000000000000000";
  const paymentAmount: number = walletStoreContext?.cart.reduce((acc, item: Item) => item.amount > 0 ? acc + (item.price * Number(item.amount)) : acc, 0) || 0;

  const [amountInEth, setAmountInEth] = useState<number>(0);
  const [amountInWei, setAmountInWei] = useState<number>(0);

  const [paymentConfirmation, setPaymentConfirmation] = useState({});

  const [hashedCart, setHashedCart] = useState({});
  const [cart, setCart] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      if (walletStoreContext?.cart) {
        const saleJSON = encode(JSON.stringify(walletStoreContext?.cart));
        let hashedSaleJSON = sha256Hasher(saleJSON);

        setCart(saleJSON);
        setHashedCart(hashedSaleJSON);

        setAmountInEth(await CryptoConverter.convertUSDtoETH(paymentAmount));
        setAmountInWei(await CryptoConverter.convertETHtoWei(amountInEth));
      }
    }

    const fetchPaymetConfirmation = async () => {
      if (contract.data) {
        console.log("Fetching payment confirmation..");
        const paymentConfirmationURL = buildPaymentConfirmationURL(contract.data.toString() ?? "");
        const paymentTransactionData = await axios.get(paymentConfirmationURL);

        console.log("paymentConfirmation: ", paymentConfirmation);
        setPaymentConfirmation(paymentTransactionData.data);
      }
    }

    setTimeout(() => { fetchPaymetConfirmation() }, 2000);
    fetchData();
  }, [hashedCart, amountInEth, amountInWei])

  const params = buildPaymentContractParams(storePaymentAddress, amountInWei.toString(), `0x${hashedCart}`);
  console.log("[INFO] Payment contract params", params);

  const contract = useContractRead({
    address: PaymentFactoryContractAddress,
    abi: paymentFactoryABI.abi,
    functionName: PaymentFactoryFunctionName,
    args: params
  });

  let qrCodeURL;

  try {
    if (contract.data && amountInWei) {

      console.log("[INFO] Contract", contract);
      qrCodeURL = `ethereum:${contract.data}?value=${amountInWei}`;

      const saleData = {
        store: walletStoreContext?.storeId,
        amountInUSD: paymentAmount,
        amountInEth: amountInEth,
        amountInWei: amountInWei,
        contractPaymentAddress: PaymentFactoryContractAddress,
        transactionHash: contract.data,
        hashedCart: hashedCart,
      }
      post('/sale', saleData);
    }
  } catch (e) {
    console.log("[ERROR] Could not save transaction!")
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
          {!walletStoreContext?.cart && <p>Cart is empty! Start a new sale.</p>}
          {!qrCodeURL && walletStoreContext?.cart && <p>Generating QR code for payment..</p>}
          {qrCodeURL && walletStoreContext?.cart && !paymentConfirmation &&
            <>
              <Text>
                To begin checkout, open the camera on your mobile device and scan the QR code below.
              </Text>
              <Container>
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%" }}>
                  <QRCode
                    size={300}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={qrCodeURL}
                  />
                </div>
              </Container>
            </>
          }
          {qrCodeURL && paymentConfirmation &&
            <>
              Pending transaction..
            </>
          }
        </Flex>
      </Layout >
    </>
  );
}

