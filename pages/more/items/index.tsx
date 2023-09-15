import { Flex, Button, createStyles } from '@mantine/core';
import Layout from '../../../components/layout';
import SaleItem from '../../../components/sale-item/sale-item';
import Link from 'next/link';
import { AppContext } from '@/context';
import { useContext, useEffect, useState } from 'react';
import fetch from '@/api/api';
import { Store } from '@/types/item';

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: -1,
    textAlign: 'center'
  },
  subtitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    opacity: 0.65,
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: -1,
    textAlign: 'left',
    marginLeft: '15px',
    marginBottom: '15px'
  },
  button: {
    fontSize: 24,
    opacity: 0.8,
  },
  link: {
    textDecoration: 'none',
    textDecorationColor: '#fff',
    color: '#666',
  }
}));

export default function Transactions() {
  const { classes } = useStyles();
  const { walletStoreContext } = useContext(AppContext);
  const [saleItems, setSaleItems] = useState<Store[]>();

  async function fetchSaleItems() {
    const storeItemsData: Store[] = await fetch(`/store/${walletStoreContext?.storeId}/items`);
    setSaleItems(storeItemsData);
    console.log("🚀 ~ file: index.tsx:46 ~ fetchSaleItems ~ storeItemsData:", storeItemsData)
  }


  useEffect(() => {
    fetchSaleItems();
  }, []);

  return (
    <Layout title="Store Items">
      <Flex
        direction="column"
        justify="center"
        align="center"
        mb={100}
      >
       {saleItems?.map(item => {
          return (
            <SaleItem
              key={item['id']}
              thumbnail={"https://images.pexels.com/photos/2425011/pexels-photo-2425011.jpeg?auto=compress&cs=tinysrgb&w=100&h=200&dpr=1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"}
              name={item['name']}
              stock={item['units']}
              price_usd={item['price']}
              include_price_ethereum={false}
            />
          );
        }
        )}
        {/* <SaleItem {...mockData} />
        <SaleItem {...mockData} />
        <SaleItem {...mockData} />
        <SaleItem {...mockData} /> */}
        <Link className={classes.link} href={'/more/items/create-items'} style={{ display: 'contents' }}>
          <Button color="dark" w={"100%"} size="lg">Add new item</Button>
        </Link>
      </Flex>
    </Layout >
  );
}
