"use client";

import { AppContext } from '@/context';
import { PaymentFactoryContractAddress, PaymentFactoryFunctionName, buildPaymentContractParams } from '@/lib/contract';
import CryptoConverter from '@/lib/currency';
import { sha256Hash as hasher } from '@/lib/hashing';
import { Item } from '@/types/item';
import { encode } from '@ipld/dag-cbor';
import { Container, Flex, Text } from '@mantine/core';
import currency from 'currency.js';
import { useContext, useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { useContractRead } from "wagmi";
import Layout from '../../../components/layout';
import paymentFactoryABI from "../../../fixtures/PaymentFactory.json" assert { type: "json" };


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
        let data = await hasher(serializedSaleData)
        let hexHashedData = Buffer.from(data).toString('hex');
        setHashedData(hexHashedData);
        setAmountInEth(CryptoConverter.convertUSDtoETH(paymentAmount).toString());
      }
    }

    fetchData();

  }, [amountInEth, hashedData])


  const calculateAmountInWei = function (amountInEth: string) {
    return ((currency(amountInEth, { precision: 8 }).multiply(1000000000000000000)).value).toString();
  }

  const params = buildPaymentContractParams(storePaymentAddress, calculateAmountInWei(amountInEth), `0x${hashedData}`);
  console.log("paymentContractParams", params);


  /* [TODO]
    - Adjust transaction model to include fields for saving the information below
    - Save:
        - contents of cart (walletStoreContext?.cart) in the database
        - amount in WEI (amountInWei) passed to contract in the database
        - hashed data (`0x${hashedData}`) in the database
        - contract payment address  (contract.data) in the database
  */

  let qrCodeURL = "";
  const contract = useContractRead({
    address: PaymentFactoryContractAddress,
    abi: paymentFactoryABI.abi,
    functionName: PaymentFactoryFunctionName,
    args: params
  });

  if (contract.data) {
    console.log("contract", contract);
    let amountInWei = calculateAmountInWei(amountInEth);
    qrCodeURL = `ethereum:${contract.data}?value=${amountInWei.toString()}`
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
          {
            !walletStoreContext?.cart ?
              <p>
                Cart is empty!
              </p>
              :
              <><Text>
                To begin checkout, open the camera on your mobile device and scan the QR code below.
              </Text>
                {contract.data &&
                  <Container>
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                      <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={qrCodeURL}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </Container>
                }
              </>
          }
        </Flex>
      </Layout >
    </>
  );
}

