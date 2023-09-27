import {
  Text,
  Group,
  Flex,
  Stack,
  ActionIcon,
  Container,
  Button,
  Table,
  Paper,
} from '@mantine/core';
import { IconReceipt2, IconChevronRight } from '@tabler/icons-react';
import classes from '@/pages/App.module.css';

interface ItemProps {
  id: number;
  name: string;
  sku: string;
  price: number;
  units: number;
  thumbnail: string;
  storeId: number;
  amount: number;
  created_at: Date;
}

interface OrderProps {
  id: number;
  customer_email: string;
  storeId: number;
  amountInUSD: number;
  amountInEth: number;
  amountInWei: number;
  items: ItemProps[];
  paymentFactoryAddress: string;
  paymentAddress: string;
  paymentTransactionHash: string;
  hashedCart: string;
  created_at: Date;
}

interface TransactionDetailsProps {
  orders: OrderProps[];
}

export default function TransactionDetails({ orders }: any) {
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #e2e8f0',
  };

  const thTdStyle = {
    border: '1px solid #e2e8f0',
    padding: '8px',
    textAlign: 'left',
  };

  return (
    <Container style={{ width: '100%', padding: 0 }}>
      <Group gap={'sm'} mb={15} justify="space-between">
        <Group gap={'lg'}>
          <IconReceipt2 style={{ width: '48px', height: '48px', marginTop: '0px' }} />
          <Flex justify="flex-start" align="flex-start" direction="column" gap={0.5}>
            <Text className={classes.itemTitle_transactions} mb={-5}>
              {'$' + orders?.amountInUSD}
            </Text>
            <Text color="dimmed" size="md">
              {orders?.customer_email}
            </Text>
          </Flex>
        </Group>
        <Group gap={'sm'}>
          <Stack>
            <Text className={classes.itemTitle_transactions} size="lg">
              {new Date(orders?.created_at).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Stack>
        </Group>
      </Group>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <Text size="sm">{orders?.paymentTransactionHash}</Text>
        </div>

        <div style={{ flex: '1' }}>
          <Paper shadow="xs" p="lg">
            <Table striped style={{ minWidth: '100%' }}>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orders?.items.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.sku}</td>
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Paper>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Text>Amount in USD:</Text>
              <Text>${orders?.amountInUSD}</Text>
            </div>
            <div>
              <Text>Amount in ETH:</Text>
              <Text>{orders?.amountInEth} ETH</Text>
            </div>
            <div>
              <Text>Amount in WEI:</Text>
              <Text>{orders?.amountInWei} WEI</Text>
            </div>
          </div>
        </div>
      </div>

      <Button className={classes.button} color="dark" w={'100%'} size="lg" mt={30}>
        Send receipt
      </Button>
    </Container>
  );
}
