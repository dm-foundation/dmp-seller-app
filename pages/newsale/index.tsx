import { AppContext } from '@/context';
import { Button, Flex, createStyles } from '@mantine/core';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout';
import SaleItem from '../../components/sale-item/sale-item';
import { get } from '../../api/api';
import { useAccount } from 'wagmi';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: -1,
  },
  link: {
    textDecoration: 'none',
    textDecorationColor: '#fff',
    color: '#fff',
  },
}));

export default function NewSale() {
  const { classes } = useStyles();
  const { address, isConnected } = useAccount();

  const [saleItems, setSaleItems] = useState([]);
  const { walletStoreContext, updateContext } = useContext(AppContext);

  async function fetchWalletStore() {
    const walletAddressData = await get(`/wallet-address/${address}`);
    const storeData = await get(`/store/${walletAddressData?.storeId}`);
    const walletStoreObj = { ...storeData, ...walletAddressData };
    updateContext(walletStoreObj);
  }

  async function fetchSaleItems() {
    const storeItemsData = await get(`/store/${walletStoreContext?.storeId}/items`);
    setSaleItems(storeItemsData);
  }

  useEffect(() => {
    fetchSaleItems();
  }, []);

  return (
    <Layout title="New Sale">
      <Flex direction="column" justify="stretch" align="center" mb={100}>
        {/* {saleItems.length == 0 && <p>Loading items in your store..</p>} */}

        {saleItems.map((item) => {
          return (
            <SaleItem
              key={item['id']}
              thumbnail={
                'https://images.pexels.com/photos/2425011/pexels-photo-2425011.jpeg?auto=compress&cs=tinysrgb&w=100&h=200&dpr=1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80'
              }
              name={item['name']}
              stock={item['units']}
              price_usd={item['price']}
              include_price_ethereum={false}
            />
          );
        })}

        <Link className={classes.link} href={'/newsale/checkout'} style={{ display: 'contents' }}>
          <Button color="dark" w={'100%'} size="lg">
            Proceed to checkout
          </Button>
        </Link>
      </Flex>
    </Layout>
  );
}
