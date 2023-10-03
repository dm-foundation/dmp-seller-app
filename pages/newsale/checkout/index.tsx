import { AppContext } from '@/context';
import { Item } from '@/types/item';
import { WalletStoreContext } from '@/types/wallet-store.context';
import { Box, Button, Flex, SegmentedControl } from '@mantine/core';
import Link from 'next/link';
import { useContext, useState } from 'react';
import Layout from '../../../components/layout';
import SaleItem from '../../../components/sale-item/sale-item';

export default function Checkout() {
  const { walletStoreContext, updateContext } = useContext(AppContext);
  const [disabled, setDisabled] = useState(false);
  const [currency, setCurrency] = useState("USDC");

  const updateCheckoutInfo = () => {
    const walletStoreObj = { ...walletStoreContext, ...{ paymentCurrency: currency } };
    updateContext(walletStoreObj as WalletStoreContext);
  }

  let cart = walletStoreContext?.cart as [];
  const cartSum = walletStoreContext?.cart ? cart.reduce((acc, item: Item) => item.amount > 0 ? acc + (item.price * Number(item.amount)) : acc, 0) : 0;

  return (
    <>
      <Layout title="Review Sale">
        <Flex
          direction="column"
          justify="center"
          align="center"
          mb={100}
        >
          {cart && cart.map((item) => {
            if (item['amount'] > 0) {
              return (
                <SaleItem
                  key={item['id']}
                  id={item['id']}
                  thumbnail={item['thumbnail']}
                  name={item['name']}
                  stock={item['units']}
                  priceUSD={item['price']}
                  amount={item['amount']}
                  showPriceInEthereum={true}
                  isInCart={true}
                  itemHandler={() => { }}
                />
              );
            }
          })}
          <Box mb={20} mt={40} w={'100%'}>
            Choose the currency for payment
            <SegmentedControl data={['USDC', 'ETH']} size="lg" w={"100%"} color="dark" fullWidth onChange={setCurrency} />
          </Box>
          <Link href={'/newsale/payment-scan'} style={{ display: 'contents' }}>
            <Button color="dark" w={"100%"} size="lg"
              onClick={(e) => {
                setDisabled(true);
                updateCheckoutInfo();
                setTimeout(() => {
                  setDisabled(false);
                }, 30000)
              }
              } disabled={disabled}>
              Scan to Charge {cartSum.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })} USD (to be paid in {currency})
            </Button>
          </Link>
        </Flex>
      </Layout >
    </>
  );
}
