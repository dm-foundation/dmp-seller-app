'use client';

import { AppContext } from '@/context';
import {
  PaymentFactoryDefaultCurrency,
  PaymentFactoryDefaultProofAddress,
  PaymentFactoryReadContractGetPaymentAddress,
  PaymentFactoryMainnetContractAddress,
  buildPaymentContractParams,
  buildPaymentURI,
} from '@/lib/contract';
import CryptoConverter from '@/lib/currency';
import { sha256Hasher } from '@/lib/hashing';
import classes from '@/pages/App.module.css';
import { Item } from '@/types/item';
import { encode } from '@ipld/dag-cbor';
import { Button, Container, Flex, Paper, Table, Text } from '@mantine/core';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useContractRead } from 'wagmi';
import Layout from '../../../components/layout';
import paymentFactoryABI from '../../../fixtures/PaymentFactory.json' assert { type: 'json' };
import { post } from '@/api/api';

export default function PaymentScan() {
  const { walletStoreContext } = useContext(AppContext);

  const paymentCurrency = walletStoreContext?.paymentCurrency || PaymentFactoryDefaultCurrency;
  const cartItems = walletStoreContext?.cart.filter((item) => item.amount > 0) || [];
  const amountInUSD: number =
    cartItems?.reduce((acc, item: Item) => acc + item.price * Number(item.amount), 0) || 0;
  const amountInUSDC: number = amountInUSD * 1000000 || 0;

  const merchantAddress =
    walletStoreContext?.ethAddress || '0x0000000000000000000000000000000000000000';

  const [isOrderPersisted, setIsOrderPersisted] = useState(false);
  const [amountInEth, setAmountInEth] = useState<number>(0);
  const [amountInWei, setAmountInWei] = useState<number>(0);
  const [contractParams, setContractParams] = useState<string[]>([]);

  const [hashedCart, setHashedCart] = useState('');
  let qrCodeURL: string = '';

  const convertUSDtoPaymentCurrency = async (amountInUSD: number) => {
    setAmountInEth(await CryptoConverter.convertUSDtoETH(amountInUSD));
    setAmountInWei(await CryptoConverter.convertETHtoWei(amountInEth));
  };

  const isValidQRCode = (uri: string) => {
    return uri && uri.length > 0 && !uri.includes('undefined');
  };

  useEffect(() => {
    console.log('[INFO] hashedCart: ', hashedCart);
    const fetchPaymentParamsData = async () => {
      if (walletStoreContext?.cart) {
        const saleJSON = encode(JSON.stringify(walletStoreContext?.cart));
        let hashedSaleJSON = sha256Hasher(saleJSON);
        setHashedCart(hashedSaleJSON);
      }
      if (paymentCurrency === 'USDC') {
        setContractParams(
          buildPaymentContractParams(
            merchantAddress,
            paymentCurrency,
            amountInUSDC.toString(),
            `0x${hashedCart}`
          )
        );
      } else {
        await convertUSDtoPaymentCurrency(amountInUSD);
        setContractParams(
          buildPaymentContractParams(
            merchantAddress,
            paymentCurrency,
            amountInWei.toString(),
            `0x${hashedCart}`
          )
        );
      }
      console.log('[INFO] paymentCurrency: ', paymentCurrency);
      console.log('[INFO] contractParams: ', contractParams);
    };

    fetchPaymentParamsData();
  }, [hashedCart, amountInUSDC, amountInWei, paymentCurrency, qrCodeURL]);
  qrCodeURL = '';

  const contractData = useContractRead({
    address: PaymentFactoryMainnetContractAddress,
    abi: paymentFactoryABI.abi,
    functionName: PaymentFactoryReadContractGetPaymentAddress,
    args: contractParams,
  });

  console.log('buildPaymentURI: ', qrCodeURL);
  if (contractData.data && !isOrderPersisted) {
    try {
      console.log('contractParams: ', contractParams);
      console.log('[INFO] Payment address', contractData.data);

      const orderData = {
        storeId: walletStoreContext?.storeId,
        amountInUSD: amountInUSD,
        amountInEth: amountInEth,
        amountInWei: amountInWei,
        amountInUSDC: amountInUSDC,
        paymentFactoryAddress: PaymentFactoryMainnetContractAddress,
        paymentAddress: contractData.data,
        paymentCurrency: paymentCurrency,
        paymentReceipt: hashedCart,
        paymentProof: PaymentFactoryDefaultProofAddress,
        items: cartItems.map((item) => ({
          itemId: item.id,
          quantity: item.amount,
          unitPrice: item.price,
        })),
      };
      console.log(orderData);
      post('/order', orderData)
        .then((order) => {
          console.log('order.then: ', order);
          if (order) {
            localStorage.setItem('orderResponse', JSON.stringify(order));
            setIsOrderPersisted(true);
          } else {
            console.log('[ERROR] Could not save order in localStorage!', JSON.stringify(order));
          }
        })
        .catch((error) => {
          console.error('[ERROR] Could not save transaction!', error);
        });
    } catch (e) {
      console.log('[ERROR] Could not save transaction!', e);
    }
  }

  if (paymentCurrency === PaymentFactoryDefaultCurrency) {
    qrCodeURL = buildPaymentURI(
      contractData.data as string,
      paymentCurrency,
      amountInUSDC.toString()
    );
  } else {
    qrCodeURL = buildPaymentURI(
      contractData.data as string,
      paymentCurrency,
      amountInWei.toString()
    );
  }

  return (
    <>
      <Layout title="Scan to checkout">
        <Flex direction="column" justify="center" align="center" gap={20} mb={100}>
          {cartItems.length === 0 && (
            <p className={classes.error}>Cart is empty! Start a new sale.</p>
          )}
          {!isValidQRCode(qrCodeURL) && walletStoreContext?.cart && (
            <p className={classes.error}>Generating QR code for payment..</p>
          )}
          {isValidQRCode(qrCodeURL) && (
            <>
              <Text>
                To begin checkout, open the camera on your mobile device and scan the QR code below.
              </Text>
              <Flex direction="column" justify="center" align="center" gap={10} mb={20}>
                <Container
                  mt={30}
                  style={{ height: 'auto', margin: '0 auto', maxWidth: 300, width: '100%' }}
                >
                  <QRCode
                    size={250}
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                    value={qrCodeURL}
                  />
                </Container>
              </Flex>
              <Paper shadow="xs" p="xl">
                <Text fz={'sm'}>
                  <b>Payment address:</b> {contractData.data as string}
                </Text>
                <Text fz={'xs'}>
                  <b>Contract parameters:</b>
                </Text>
                <>
                  {contractParams.map((p) => {
                    return <Text fz={'xs'}>{p}</Text>;
                  })}
                </>
                <Table mt={30} mb={30} fz={12}>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>
                        <b>Total Payment Amount:</b>
                      </Table.Th>
                      <Table.Th></Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td></Table.Td>
                      <Table.Td>
                        {amountInUSD.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}{' '}
                        USD
                      </Table.Td>
                    </Table.Tr>
                    {paymentCurrency === 'USDC' && (
                      <Table.Tr>
                        <Table.Td></Table.Td>
                        <Table.Td>
                          {amountInUSD.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}{' '}
                          USDC
                        </Table.Td>
                      </Table.Tr>
                    )}
                    {paymentCurrency !== 'USDC' && (
                      <>
                        <Table.Tr>
                          <Table.Td></Table.Td>
                          <Table.Td>{amountInEth} ETH</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td></Table.Td>
                          <Table.Td>{amountInWei} WEI</Table.Td>
                        </Table.Tr>
                      </>
                    )}
                  </Table.Tbody>
                </Table>
                <Button color="dark" w={'100%'} size="lg">
                  <Link
                    style={{ textDecoration: 'none', color: '#fff' }}
                    href={{
                      pathname: `/newsale/payment-confirmation/${contractData.data}/${paymentCurrency}`,
                    }}
                  >
                    Go to payment confirmation
                  </Link>
                </Button>
              </Paper>
            </>
          )}
        </Flex>
      </Layout>
    </>
  );
}
