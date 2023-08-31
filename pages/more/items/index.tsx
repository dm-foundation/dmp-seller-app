import { Title, Flex, Button, Divider } from '@mantine/core';
import useStyles from '../more.styles';
import Layout from '../../../components/layout';
import { IconBuildingStore, IconSettings, IconZoomMoney } from '@tabler/icons-react';
import SaleItem from '../../../components/sale-item/sale-item';
export default function Transactions() {
  const { classes } = useStyles();

  let mockData = {
    "thumbnail": "https://images.pexels.com/photos/2425011/pexels-photo-2425011.jpeg?auto=compress&cs=tinysrgb&w=100&h=200&dpr=1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    "name": "Poster name",
    "stock": 12,
    "price_usd": 30.00,
    "include_price_ethereum": false
  }

  return (
    <>
      <Layout>
        <Title className={classes.title} size="sm" align='center' mb="xl" mt="xl">
          Store Items
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
          <SaleItem {...mockData} />
          <SaleItem {...mockData} />

          <Button>Add new item</Button>
        </Flex>
      </Layout >
    </>
  );
}
