import { Button, Flex, createStyles } from '@mantine/core';
import Layout from '../../../components/layout';
import SaleItem from '../../../components/sale-item/sale-item';
import Link from 'next/link';
import { AppContext } from '@/context';
import { useContext } from 'react';
import { Item } from '@/types/item';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: - 1,
  },
}));

export default function Checkout() {
  const { classes } = useStyles();
  const { walletStoreContext } = useContext(AppContext);

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
          {cart.map((item) => {
            if (item['amount'] > 0) {
              return (
                <SaleItem
                  key={item['id']}
                  id={item['id']}
                  thumbnail={'https://images.pexels.com/photos/2425011/pexels-photo-2425011.jpeg?auto=compress&cs=tinysrgb&w=100&h=200&dpr=1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80'}
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
          <Link href={'/newsale/payment-scan'} style={{ display: 'contents' }}>
            <Button color="dark" w={"100%"} size="lg">
              Scan to Charge {cartSum.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })} USD
            </Button>
          </Link>
        </Flex>
      </Layout >
    </>
  );
}
