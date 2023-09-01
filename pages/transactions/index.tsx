import { Title, Text, Button, Flex, Divider, createStyles } from '@mantine/core';
import Layout from '../../components/layout';
import TransactionItem from '../../components/transaction-item/transaction-item';

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: -1,
  },
}));

export default function Transactions() {
  const { classes } = useStyles();

  let mockData = {
    "seller_name": "Rome Travel Poster",
    "price_usd": 30.00,
    "transaction_timestamp": new Date(),
  }

  return (
    <Layout title="Transactions">
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
  );
}
