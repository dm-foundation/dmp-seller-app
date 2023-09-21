import { AppContext } from '@/context';
import { Item } from '@/types/item';
import { WalletStoreContext } from '@/types/wallet-store.context';
import { Button, Flex, createStyles } from '@mantine/core';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { get } from '../../api/api';
import Layout from '../../components/layout';
import SaleItem from '../../components/sale-item/sale-item';

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
  const { address } = useAccount();

  const [saleItems, setSaleItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const { walletStoreContext, updateContext } = useContext(AppContext);

  async function itemHandler(itemId: number, count: number) {
    let selectedItem = saleItems.filter((item) => item.id === itemId);
    selectedItem[0].amount = count;
    setSelectedItems(saleItems);
  }

  async function fetchWalletStore() {
    const walletAddressData = await get(`/wallet-address/${address}`);
    const storeData = await get(`/store/${walletAddressData?.storeId}`);
    const walletStoreObj = { ...storeData, ...walletAddressData };
    updateContext(walletStoreObj);
  }

  async function fetchSaleItems() {
    if (!walletStoreContext?.storeId) { return; }

    const storeItemsData: Item[] = await get(`/store/${walletStoreContext?.storeId}/items`);
    setSaleItems(storeItemsData);
  }

  async function updateCart() {
    const walletStoreObj = { ...walletStoreContext, ...{ cart: selectedItems } };
    updateContext(walletStoreObj as WalletStoreContext);
  }

  async function fetchData() {
    await fetchWalletStore();
    return await fetchSaleItems();
  }

  useEffect(() => {
    fetchData();
    console.log("Rodou o useEffect");
  }, [walletStoreContext?.storeId]);

  return (
    <Layout title="New Sale">
      <Flex direction="column" justify="stretch" align="center" mb={100}>
        {saleItems.length == 0 && <p>Loading..</p>}

        {saleItems.length > 0 && saleItems.map((item) => {
          return (
            <SaleItem
              key={item['id']}
              id={item['id']}
              thumbnail={'https://images.pexels.com/photos/2425011/pexels-photo-2425011.jpeg?auto=compress&cs=tinysrgb&w=100&h=200&dpr=1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80'}
              name={item['name']}
              stock={item['units']}
              priceUSD={item['price']}
              amount={selectedItems.filter((item) => item.id == item['id'])[0]?.amount || 0}
              showPriceInEthereum={true}
              isInCart={false}
              itemHandler={itemHandler}
            />
          );
        })}

        <Link className={classes.link} href={'/newsale/checkout'} style={{ display: 'contents' }}>
          <Button color="dark" w={'100%'} size="lg" onClick={updateCart}>
            Proceed to checkout
          </Button>
        </Link>
      </Flex>
    </Layout>
  );
}
