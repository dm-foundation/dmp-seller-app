import { Title, Text, Button, Flex, Divider, Container } from '@mantine/core';
import { createStyles } from '@mantine/core';
import Layout from '../../components/layout';
import SaleItem from '../../components/sale-item/sale-item';
import Link from 'next/link';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import axios from "axios";
import fetch from '../../api/api';
import { useAccount } from 'wagmi';
import { AppContext } from '@/context';
import { WalletContext } from '@/types/walletAddress';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: - 1,
  },
  link: {
    textDecoration: 'none',
    textDecorationColor: '#fff',
    color: '#fff'
  }
}));



export default function NewSale() {
  const { classes } = useStyles();
  const [saleItems, setSaleItems] = useState([]);
  const [walletAddress, setWalletAddress] = useState({});
  const { address, isConnected } = useAccount();
  const context = useContext(AppContext);

  async function fetchSaleItems() {
    const storeItemsData = await fetch("/store/1/items");
    setSaleItems(storeItemsData);
  }

  async function fetchWalletAddress() {
    const walletAddressData = await fetch(`/wallet-address/${address}`);
    // context.id_store = walletAddressData.id_store;
    context.updateContext(walletAddressData);
  }

  useEffect(() => {
    fetchSaleItems();
    fetchWalletAddress();
  }, []);

  return (
    <Layout title="New Sale">
      <Flex
        direction="column"
        justify="stretch"
        align="center"
        mb={100}
      >
        {saleItems.map(item => {
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

        <Link className={classes.link} href={'/newsale/checkout'} style={{ display: 'contents' }}>
          <Button color="dark" w={"100%"} size="lg">
            Proceed to checkout
          </Button>
        </Link>
      </Flex>
    </Layout >
  );
}
