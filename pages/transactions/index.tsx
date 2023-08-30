import { Title, Text, Button, Flex, Divider } from '@mantine/core';
import useStyles from './transactions.styles';
import Layout from '../../components/layout';
import TransactionItem from '../../components/transaction-item/transaction-item';
export default function Transactions() {
  const { classes } = useStyles();

  let mockData = {
    "seller_name": "Rome Travel Poster",
    "price_usd": 30.00,
    "transaction_timestamp": new Date(),
  }

  return (
    <>
      <Layout>
        <Title className={classes.title} size="sm" align='center' mb="xl" mt="xl">
          Transactions
        </Title>
        <Divider orientation="horizontal" w={"100%"} mb="xl" mt="xl" />
        <Flex
          direction="column"
          justify="center"
          align="center"
          mb={100}
        >
          <TransactionItem {...mockData} />
          <TransactionItem {...mockData} />
        </Flex>
      </Layout >
    </>
  );
}
