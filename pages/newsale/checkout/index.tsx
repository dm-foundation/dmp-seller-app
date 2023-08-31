import { Title, Text, Button, Flex, Divider } from '@mantine/core';
import useStyles from '../newsale.styles';
import Layout from '../../../components/layout';
import SaleItem from '../../../components/sale-item/sale-item';
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
      <Layout>
        <Title className={classes.title} size="sm" align='center' mb="xl" mt="xl">
          Review Sale
        </Title>
        <Divider orientation="horizontal" w={"100%"} mb="xl" mt="xl" />
        <Flex
          direction="column"
          justify="center"
          align="center"
          mb={100}
        >
          <SaleItem {...mockData} />
          <SaleItem {...mockData} />

          <Button>Scan to Charge $60.00</Button>
        </Flex>
      </Layout >
    </>
  );
}
