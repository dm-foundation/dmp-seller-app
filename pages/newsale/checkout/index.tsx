import { Button, Flex } from '@mantine/core';
import Layout from '../../../components/layout';
import SaleItem from '../../../components/sale-item/sale-item';
import Link from 'next/link';
import { AppContext } from '@/context';
import { useContext, useState } from 'react';
import { Item } from '@/types/item';
import classes from '@/pages/App.module.css';

// const useStyles = createStyles((theme) => ({
//   title: {
//     fontSize: 28,
//     fontWeight: 900,
//     letterSpacing: - 1,
//   },
// }));

export default function Checkout() {
  const { walletStoreContext } = useContext(AppContext);
  const [disabled, setDisabled] = useState(false);

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
          <Link href={'/newsale/payment-scan'} style={{ display: 'contents' }}>
            <Button color="dark" w={"100%"} size="lg"
              onClick={(e) => {
                setDisabled(true);
                setTimeout(() => {
                  setDisabled(false);
                }, 20000)
              }
              } disabled={disabled}>
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
