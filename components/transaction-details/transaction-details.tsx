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
  Box,
  Space,
} from '@mantine/core';
import { IconReceipt2, IconChevronRight } from '@tabler/icons-react';
import classes from '@/pages/App.module.css';

interface ItemProps {
  id: number;
  name: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  thumbnail: string;
  storeId: number;
  created_at: Date;
}

interface OrderProps {
  id: number;
  customer_email: string;
  storeId: number;
  amountInUSD: number;
  amountInEth: number;
  amountInWei: number;
  amountInUSDC: number;
  items: ItemProps[];
  paymentProof: string;
  paymentFactoryAddress: string;
  paymentAddress: string;
  paymentTransactionHash: string;
  paymentReceipt: string;
  created_at: Date;
}

interface TransactionDetailsProps {
  orders: OrderProps[];
}

export default function TransactionDetails({ orders }: any) {

  function formatDecimalNumber(number: number | string, decimalPlaces: number) {
    const roundedNumber = Number(number).toFixed(decimalPlaces);
    const trimmedNumber = parseFloat(roundedNumber);
    return trimmedNumber.toString();
  }

  const rows = orders?.items.map((item: any) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.quantity}</Table.Td>
      <Table.Td>{item.sku}</Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{Number(item.unitPrice).toFixed(2)}</Table.Td>
      <Table.Td>{Number(item.unitPrice * item.quantity).toFixed(2)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container style={{ width: '100%', padding: 0 }}>
      <Group gap={'sm'} mb={15} justify="space-between">
        <Group gap={'lg'}>
          <Flex justify="flex-start" align="flex-start" direction="column" gap={5}>
            <Text className={classes.transaction_title} mb={-5}>
              {new Date(orders?.created_at).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              {' - '}
              {new Date(orders?.created_at).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            {!orders?.paymentTransactionHash && <Text size="sm" color="orange">Transaction hash: pending</Text>}
            {orders?.paymentTransactionHash && <Text size="sm">Transaction hash: {orders?.paymentTransactionHash}</Text>}
          </Flex>
        </Group>
      </Group>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>QTY</Table.Th>
            <Table.Th>CODE</Table.Th>
            <Table.Th>DESCRIPTION</Table.Th>
            <Table.Th>UNIT PRICE</Table.Th>
            <Table.Th>PRICE</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <Flex justify="flex-start" align="flex-start" direction="column" gap={5} mt={30}>
        <Table>
          <Table.Tbody>
            <Table.Tr>
              <Flex
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="column"
                wrap="wrap"
                mt={10}
              >
                <Text size="sm" fw={600}>TOTAL</Text>
              </Flex>
              <Table.Th>
                <Flex
                  gap="md"
                  justify="flex-start"
                  align="flex-end"
                  direction="column"
                  wrap="wrap"
                >
                  <Text size="sm" fw={600}>{Number(orders?.amountInUSD).toFixed(2)} USD</Text>
                  <Text size="sm" fw={600}>{formatDecimalNumber(orders?.amountInEth, 8)} ETH</Text>
                  <Text size="sm" fw={600}>{formatDecimalNumber(orders?.amountInWei, 8)} WEI</Text>
                </Flex>
              </Table.Th>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Flex>

      <Button className={classes.button} color="dark" w={'100%'} size="lg" mt={30}>
        Send receipt
      </Button>
    </Container >
  );
}
