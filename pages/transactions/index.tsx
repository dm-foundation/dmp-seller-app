import { Flex } from '@mantine/core';
import Layout from '../../components/layout';
import TransactionItem from '../../components/transaction-item/transaction-item';

export default function Transactions() {

  let mockData = {
    "seller_name": "Rome Travel Poster",
    "priceUSD": 30.00,
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
