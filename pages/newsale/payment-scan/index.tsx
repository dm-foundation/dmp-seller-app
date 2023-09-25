"use client";

import { AppContext } from '@/context';
import { PaymentFactoryContractAddress, PaymentFactoryFunctionName, buildPaymentContractParams } from '@/lib/contract';
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


export default function PaymentScan() {
  const { walletStoreContext } = useContext(AppContext);
  const storePaymentAddress = walletStoreContext?.ethAddress || "0x0000000000000000000000000000000000000000";
  const paymentAmount: number = walletStoreContext?.cart.reduce((acc, item: Item) => item.amount > 0 ? acc + (item.price * Number(item.amount)) : acc, 0) || 0;

  const [amountInEth, setAmountInEth] = useState<number>(0);
  const [amountInWei, setAmountInWei] = useState<number>(0);
  const [hashedData, setHashedData] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (walletStoreContext?.cart) {
        const serializedSaleData = encode(JSON.stringify(walletStoreContext?.cart));
        let hexHashedData = sha256Hasher(serializedSaleData);
        setHashedData(hexHashedData);
        setAmountInEth(await CryptoConverter.convertUSDtoETH(paymentAmount));
        setAmountInWei(await CryptoConverter.convertETHtoWei(amountInEth));
      }
    }

    fetchData();
  }, [hashedData])

  const params = buildPaymentContractParams(storePaymentAddress, amountInWei.toString(), `0x${hashedData}`);
  console.log("[INFO] Payment contract params", params);

  const contract = useContractRead({
    address: PaymentFactoryContractAddress,
    abi: paymentFactoryABI.abi,
    functionName: PaymentFactoryFunctionName,
    args: params
  });

  let qrCodeURL;
  if (contract.data) {
    console.log("[INFO] Contract", contract);
    qrCodeURL = `ethereum:${contract.data}?value=${amountInWei}`;
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
          {!qrCodeURL && <p>Could not generate QR code for payment.</p>}
          {!walletStoreContext?.cart && <p>Cart is empty! Start a new sale.</p>}
          {qrCodeURL &&
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
        </Flex>
      </Layout >
    </>
  );
}

