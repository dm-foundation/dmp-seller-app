import { Text, Group, Flex, Stack, ActionIcon, Container } from '@mantine/core';
import { IconReceipt2, IconChevronRight } from '@tabler/icons-react';
import classes from '@/pages/App.module.css';
import { useContext } from 'react';
import { AppContext } from '@/context';
import Link from 'next/link';

interface TransactionItemProps {
  seller_name: string;
  priceUSD: number;
  transaction_timestamp: Date;
  orders?: any;
  id?: number;
}

export default function TransactionItem({
  seller_name,
  priceUSD,
  transaction_timestamp,
  orders,
  id
}: TransactionItemProps) {
  const { updateCtxOrder } = useContext(AppContext);

  
  const handleGetTransaction = (id:number | undefined) => {
    const getOrder = orders.find((order:any) => order.id === id);
    updateCtxOrder(getOrder);
  }

  return (
    <Container w={'100%'} pl={0} pr={0}>
      <Group gap={'sm'} mb={15} justify="space-between">
        <Group gap={'lg'}>
          <IconReceipt2 style={{ width: '48', height: '48', marginTop: '0px' }} />
          <Flex justify="flex-start" align="flex-start" direction="column" gap={0.5}>
            <Text className={classes.itemTitle_transactions} mb={-5}>
              {'$' +
                priceUSD.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
            </Text>
            <Text c="dimmed" fz="md">
              {seller_name}
            </Text>
          </Flex>
        </Group>
        <Group gap={'sm'}>
          <Stack>
            <Text className={classes.itemTitle_transactions} fz="lg">
              {transaction_timestamp.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Stack>
          < Link href={`/transactions/transaction-detail`}>
          <ActionIcon className={classes.button_transactions} onClick={() => handleGetTransaction(id)} >
            <IconChevronRight
              style={{ width: '36px', height: '36px' }}
            />
          </ActionIcon>
          </ Link>
        </Group>
      </Group>
    </Container>
  );
}
