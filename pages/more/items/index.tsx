import { get } from '@/api/api';
import { AppContext } from '@/context';
import { Button, Flex } from '@mantine/core';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import SaleItem from '../../../components/sale-item/sale-item';
import { Item } from '@/types/item';
import classes from '@/pages/App.module.css';
import { useRouter } from 'next/router';

// const useStyles = createStyles((theme) => ({
//   title: {
//     color: theme.colorScheme === 'dark' ? theme.white : theme.black,
//     fontSize: 28,
//     fontWeight: 900,
//     letterSpacing: -1,
//     textAlign: 'center'
//   },
//   subtitle: {
//     color: theme.colorScheme === 'dark' ? theme.white : theme.black,
//     opacity: 0.65,
//     fontSize: 24,
//     fontWeight: 800,
//     letterSpacing: -1,
//     textAlign: 'left',
//     marginLeft: '15px',
//     marginBottom: '15px'
//   },
//   button: {
//     fontSize: 24,
//     opacity: 0.8,
//   },
//   link: {
//     color: '#666',
//   }
// }));

export default function Items() {
  const router = useRouter();
  const { walletStoreContext } = useContext(AppContext);
  const [saleItems, setSaleItems] = useState<Item[]>();

  async function fetchSaleItems() {
    if (!walletStoreContext?.storeId) {
      console.error('No store id in context');
      return;
    }
    const storeItemsData: Item[] = await get(`/store/${walletStoreContext?.storeId}/items`);
    setSaleItems(storeItemsData);
  }

  async function itemHandler(itemId: number) {
    router.push({
      pathname: '/more/items/edit-items',
      query: { itemId },
    });
  }

  useEffect(() => {
    fetchSaleItems();
  }, []);

  return (
    <Layout title="Store Items">
      <Flex direction="column" justify="center" align="center" mb={100}>
        {saleItems?.map((item) => {
          return (
            <div onClick={() => itemHandler(item['id'])} style={{ width: '100%' }}>
              <SaleItem
                key={item['id']}
                id={item['id']}
                thumbnail={item['thumbnail']}
                name={item['name']}
                stock={item['units']}
                amount={item['amount']}
                priceUSD={item['price']}
                showPriceInEthereum={true}
                isInCart={false}
                itemHandler={() => {
                  itemHandler(item['id']);
                }}
                exclude_select_units={true}
                cursorPointer={true}
              />
            </div>
          );
        })}
        <Link
          className={classes.link}
          href={'/more/items/create-items'}
          style={{ display: 'contents' }}
        >
          <Button color="dark" w={'100%'} size="lg">
            Add new item
          </Button>
        </Link>
      </Flex>
    </Layout>
  );
}
