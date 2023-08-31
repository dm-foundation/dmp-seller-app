import { Title, Image, Flex, Divider, Box, Text, createStyles } from '@mantine/core';
import Layout from '../../../components/layout';
import EarningsItem from '../../../components/earnings-item/earnings-item';

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: -1,
    textAlign: 'center'
  },
  subtitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    opacity: 0.65,
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: -1,
    textAlign: 'left',
    marginLeft: '15px',
    marginBottom: '15px'
  },
  button: {
    fontSize: 24,
    opacity: 0.8,
  },
  link: {
    textDecoration: 'none',
    textDecorationColor: '#fff',
    color: '#666',
  },
  totalEarnings: {
    fontSize: 44,
    fontWeight: 800,
  }
}));


export default function Transactions() {
  const { classes } = useStyles();

  let mockData = {
    date: new Date(),
    item_name: "poster",
  }
  return (
    <>
      <Layout>
        <Title className={classes.title} size="sm" align='center' mb="xl" mt="xl">
          Earnings
        </Title>
        <Divider orientation="horizontal" w={"100%"} mb="xl" mt="xl" />
        <Flex
          direction="column"
          justify="center"
          align="center"
          mb={100}
        >
          <Flex
            ta={'center'}
            direction="column"
            justify="center"
            align="center"
            mb={10}>
            <Image width={'100%'} height={140} fit="contain"
              src="../columnchart.png">
            </Image>
            <Text c="dimmed" fz='md'>Total Earnings</Text>
            <Text className={classes.totalEarnings}>$240.00</Text>
            <Text c="dimmed" fz='sm'>0.0015 ETH</Text>
          </Flex>
          <EarningsItem item_count={Math.round(Math.random() * 10)} item_total_price={20 + Math.random() * 20} {...mockData} />
          <EarningsItem item_count={Math.round(Math.random() * 10)} item_total_price={20 + Math.random() * 20} {...mockData} />
        </Flex>
      </Layout >
    </>
  );
}
