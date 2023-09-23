import { AppContext } from '@/context';
import { Item } from '@/types/item';
import { WalletStoreContext } from '@/types/wallet-store.context';
import { Button, Flex, createStyles } from '@mantine/core';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { get } from '../../api/api';
import Layout from '../../components/layout';
import SaleItem from '../../components/sale-item/sale-item';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: -1,
  },
  error: {
    fontSize: 24,
    fontWeight: 900,
  }
}));

export default function NewSale() {
  const { classes } = useStyles();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [error, setError] = useState<string | undefined>(undefined);

  const [saleItems, setSaleItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const { walletStoreContext, updateContext } = useContext(AppContext);

  async function itemHandler(itemId: number, count: number) {
    let selectedItem = saleItems.filter((item) => item.id === itemId);
    selectedItem[0].amount = count;
    setSelectedItems(saleItems);
  }

  async function updateCart() {
    const walletStoreObj = { ...walletStoreContext, ...{ cart: selectedItems } };
    updateContext(walletStoreObj as WalletStoreContext);
  }

  useEffect(() => {
    const fetchWalletStore = async () => {
      try {
        const walletAddressData = await get(`/wallet-address/${address}`);
        if (!walletAddressData?.storeId) { throw Error(`Store not found for you wallet address ${address}`) }

        const storeData = await get(`/store/${walletAddressData?.storeId}`);
        const walletStoreObj = { ...storeData, ...walletAddressData };
        updateContext(walletStoreObj);

        const storeItemsData: Item[] = await get(`/store/${walletAddressData?.storeId}/items`);
        setSaleItems(storeItemsData);

      } catch (e) {
        let errorMsg = (e as Error).message;
        setError(errorMsg);
      }
    }
    setTimeout(() => fetchWalletStore(), 1000)
  }, [address]);

  return (
    <Layout title="New Sale">
      <Flex direction="column" justify="stretch" align="center" mb={100}>
        {error &&
          <>
            <p className={classes.error}>An error occurred: {error}</p>
            <Button
              color="dark"
              size="lg"
              onClick={() => {
                disconnect()
                window.location.href = '/login/wallet-selection';
              }}
            >
              Connect with different wallet
            </Button>
          </>
        }
        {!error && saleItems.length == 0 && <p className={classes.error}>Loading store items..</p>}
        {!error && saleItems.length > 0 &&
          saleItems.map((item) => {
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
          })
        }
        {!error &&
          < Link href={'/newsale/checkout'} style={{ display: 'contents' }}>
            <Button color="dark" w={'100%'} size="lg" onClick={updateCart}>
              Proceed to checkout
            </Button>
          </Link>}
      </Flex>
    </Layout >
  );
}
