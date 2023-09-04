import { Button, Flex, createStyles } from '@mantine/core';
import Layout from '../../../components/layout';
import SaleItem from '../../../components/sale-item/sale-item';
import Link from 'next/link';

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

  let mockData = {
    "thumbnail": "https://images.pexels.com/photos/2425011/pexels-photo-2425011.jpeg?auto=compress&cs=tinysrgb&w=100&h=200&dpr=1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    "name": "Poster name",
    "stock": 12,
    "price_usd": 30.00,
    "include_price_ethereum": true
  }

  return (
    <>
      <Layout title="Review Sale">
        <Flex
          direction="column"
          justify="center"
          align="center"
          mb={100}
        >
          <SaleItem {...mockData} />
          <SaleItem {...mockData} />

          <Link className={classes.link} href={'/newsale/payment-scan'} style={{ display: 'contents' }}>
            <Button color="dark" w={"100%"} size="lg">
              Scan to Charge $60.00
            </Button>
          </Link>
        </Flex>
      </Layout >
    </>
  );
}
