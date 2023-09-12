import { Title, Text, Button, Flex, Divider, Container } from '@mantine/core';
import { createStyles } from '@mantine/core';
import Layout from '../../components/layout';
import SaleItem from '../../components/sale-item/sale-item';
import Link from 'next/link';
import { SetStateAction, useEffect, useState } from 'react';
import axios from "axios";

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

  let mockData = {
    "thumbnail": "https://images.pexels.com/photos/2425011/pexels-photo-2425011.jpeg?auto=compress&cs=tinysrgb&w=100&h=200&dpr=1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    "name": "Poster name",
    "stock": 12,
    "price_usd": 30.00,
    "include_price_ethereum": true
  }

  async function fetchSaleItems() {
    axios.get("http://127.0.0.1:3000/item/store/1")
      .then((response: { data: SetStateAction<never[]>; }) => {
        setSaleItems(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchSaleItems();
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
              thumbnail={mockData.thumbnail}
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
