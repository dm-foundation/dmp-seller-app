import { Image, Flex, Text, createStyles } from '@mantine/core';
import Layout from '../../../components/layout';
import EarningsItem from '../../../components/earnings-item/earnings-item';

const useStyles = createStyles((theme) => ({
  totalEarnings: {
    fontSize: 44,
    fontWeight: 600,
  }
}));


export default function Transactions() {
  const { classes } = useStyles();

  let mockData = {
    date: new Date(),
    item_name: "poster",
    item1: {
      item_count: 1,
      item_total_price: 30
    },
    item2: {
      item_count: 7,
      item_total_price: 210
    }
  }
  return (
    <Layout title="Earnings">
      <Flex
        direction="column"
        justify="stretch"
        align="center"
        mb={50}
      >
        <Image width={'100%'} height={140} fit="contain"
          src="../columnchart.png">
        </Image>
        <Text c="dimmed" fz='md' fw={600}>Total Earnings</Text>
        <Text className={classes.totalEarnings} mt={-10}>$240.00</Text>
        <Text c="dimmed" fz='sm' mt={-10} mb={20}>0.0015 ETH</Text>


        <EarningsItem item_count={mockData.item1.item_count} item_total_price={mockData.item1.item_total_price} {...mockData} />
        <EarningsItem item_count={mockData.item2.item_count} item_total_price={mockData.item2.item_total_price} {...mockData} />
      </Flex>
    </Layout>
  );
}
