import { Button, Flex, Select } from '@mantine/core';
import { createStyles } from '@mantine/core';
import Layout from '../../components/layout';
import SaleItem from '../../components/sale-item/sale-item';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import fetch from '../../api/api';
import { useAccount } from 'wagmi';
import { AppContext } from '@/context';
import { Item } from '@/types/item';

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
  const [saleItems, setSaleItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const { walletStoreContext } = useContext(AppContext);
  const [amountChange, setAmountChange] = useState(0);
  
  async function fetchSaleItems() {
    const storeItemsData: Item[] = await fetch(`/store/${walletStoreContext?.storeId}/items`);
    setSaleItems(storeItemsData);
  }

  async function handleSelectedItem (selectedItemsProps: Item) {
    setSelectedItems((current)  => current.filter((item) => item.id !== selectedItemsProps.id));

    setSelectedItems((current) => [...current,selectedItemsProps])
  }


  async function handleAmountChange(amount: number) {
    setAmountChange(amount);
    console.log("🚀 ~ file: sale-item.tsx:32 ~ handleAmountChange ~ amount:", amount)
  }

  
  useEffect(() => {
    fetchSaleItems();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ file: index.tsx:49 ~ useEffect ~ selectedItems:", selectedItems)
  }, [selectedItems]);
  
  return (
    <Layout title="New Sale">
      <Flex direction="column" justify="stretch" align="center" mb={100}>
        {/* {saleItems.length == 0 && <p>Loading items in your store..</p>} */}

        {saleItems.map((item) => {
          return (
            <>
              <SaleItem
                key={item['id']}
                thumbnail={
                  'https://images.pexels.com/photos/2425011/pexels-photo-2425011.jpeg?auto=compress&cs=tinysrgb&w=100&h=200&dpr=1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80'
                }
                id={item['id']}
                name={item['name']}
                stock={item['units']}
                price_usd={item['price']}
                include_price_ethereum={false}
                include_select_units={true}
                handleSelectedItems={handleSelectedItem}
                handleAmountChange={handleAmountChange}
                amount={amountChange}
              />
            </>
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
