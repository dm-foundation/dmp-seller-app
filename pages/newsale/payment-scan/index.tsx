"use client";

import { post } from '@/api/api';
import { AppContext } from '@/context';
import { PaymentFactoryContractAddress, PaymentFactoryFunctionName, buildPaymentContractParams } from '@/lib/contract';
import CryptoConverter from '@/lib/currency';
import { sha256Hasher } from '@/lib/hashing';
import { Item } from '@/types/item';
import { encode } from '@ipld/dag-cbor';
import { Button, Container, Flex, Paper, Stack, Table, Text } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { useContractRead } from "wagmi";
import Layout from '../../../components/layout';
import paymentFactoryABI from "../../../fixtures/PaymentFactory.json" assert { type: "json" };
import Link from 'next/link';


export default function PaymentScan() {
  const [error, setError] = useState<string | undefined>(undefined);

  const { walletStoreContext } = useContext(AppContext);

  const cartItems = walletStoreContext?.cart.filter(item => item.amount > 0) || [];
  const amountInUSD: number = cartItems?.reduce((acc, item: Item) => acc + (item.price * Number(item.amount)), 0) || 0;

  const storePaymentAddress = walletStoreContext?.ethAddress || "0x0000000000000000000000000000000000000000";

  const [amountInEth, setAmountInEth] = useState<number>(0);
  const [amountInWei, setAmountInWei] = useState<number>(0);

  const [hashedCart, setHashedCart] = useState({});
  const [cart, setCart] = useState({});


  useEffect(() => {
    const fetchPaymentParamsData = async () => {
      if (walletStoreContext?.cart) {
        const saleJSON = encode(JSON.stringify(walletStoreContext?.cart));
        let hashedSaleJSON = sha256Hasher(saleJSON);

        setCart(saleJSON);
        setHashedCart(hashedSaleJSON);

        setAmountInEth(await CryptoConverter.convertUSDtoETH(amountInUSD));
        setAmountInWei(await CryptoConverter.convertETHtoWei(amountInEth));
      }
    }

    fetchPaymentParamsData();

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
    if (contract.data && amountInWei > 0) {

      console.log("[INFO] Contract", contract);
      qrCodeURL = `ethereum:${contract.data}?value=${amountInWei}`;

      const orderData = {
        store: walletStoreContext?.storeId,
        amountInUSD: amountInUSD,
        amountInEth: amountInEth,
        amountInWei: amountInWei,
        paymentFactoryAddress: PaymentFactoryContractAddress,
        paymentAddress: contract.data,
        hashedCart: hashedCart,
        items: cartItems.map(item => item.id)
      }
      post('/order', orderData);
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
          gap={20}
          mb={100}
        >
          {!walletStoreContext?.cart && <p>Cart is empty! Start a new sale.</p>}
          {!qrCodeURL && walletStoreContext?.cart && <p>Generating QR code for payment..</p>}
          {qrCodeURL && walletStoreContext?.cart &&
            <>
              <Text>
                To begin checkout, open the camera on your mobile device and scan the QR code below.
              </Text>
              <Flex
                direction="column"
                justify="center"
                align="center"
                gap={10}
                mb={20}
              >
                <Container mt={30} style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%" }}>
                  <QRCode
                    size={250}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={qrCodeURL}
                  />
                </Container>
              </Flex >
              <Paper shadow="xs" p="xl">
                <Text fz={'sm'}>
                  <b>Payment address:</b> {contract?.data}
                </Text>
                <Table mt={30} mb={30}>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th><b>Total Payment Amount:</b></Table.Th>
                      <Table.Th></Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td></Table.Td>
                      <Table.Td>{amountInUSD.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td></Table.Td>
                      <Table.Td>{amountInEth} ETH</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td></Table.Td>
                      <Table.Td>{amountInWei} WEI</Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
                <Button color="dark" w={"100%"} size="lg">
                  <Link style={{ textDecoration: 'none', color: '#fff' }}
                    href={{
                      pathname: `/newsale/payment-confirmation/${contract.data}`,
                    }}
                  >
                    Go to payment confirmation
                  </Link>
                </Button>
              </Paper>
            </>
          }
        </Flex >
      </Layout >
    </>
  );
}

