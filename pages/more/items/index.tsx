import { Title, Flex, Button, Divider, createStyles } from '@mantine/core';
import Layout from '../../../components/layout';
import SaleItem from '../../../components/sale-item/sale-item';

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

          <Button size="md" w={"90%"}>Add new item</Button>
        </Flex>
      </Layout >
    </>
  );
}
