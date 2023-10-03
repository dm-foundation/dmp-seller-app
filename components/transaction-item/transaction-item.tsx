import { AppContext } from '@/context';
import classes from '@/pages/App.module.css';
import { ItemProps } from '@/pages/transactions';
import { ActionIcon, Container, Flex, Group, Stack, Text } from '@mantine/core';
import {
  IconArrowBadgeRightFilled,
  IconCircle,
  IconCoin,
  IconInfoHexagonFilled,
  IconMessageCircleExclamation,
  IconReceipt,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useContext } from 'react';

interface TransactionItemProps {
  sellerName: string;
  priceUSD: number;
  transactionTimestamp: Date;
  orders?: any;
  id?: number;
}

export default function TransactionItem({
  sellerName,
  priceUSD,
  transactionTimestamp,
  orders,
  id,
}: TransactionItemProps) {
  console.log('🚀 ~ file: transaction-item.tsx:24 ~ orders:', orders);
  const { updateCtxOrder } = useContext(AppContext);

  const findTransactionDetailsById = (id: number | undefined) => {
    const order = orders.find((order: any) => order.id === id);
    updateCtxOrder(order);
  };

  return (
    <Container w={'100%'} pl={0} pr={0}>
      <Group gap={'sm'} mb={15} justify="space-between">
        <Group gap={'lg'}>
          <IconCoin style={{ width: '48', height: '48', marginTop: '0px' }} />
          <Flex justify="flex-start" align="flex-start" direction="column" mb={0}>
            <Text className={classes.transaction_title} mt={5}>
              {'$' +
                priceUSD.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
            </Text>
            <Text c="dimmed" fz="12px">
              {/* {orders ? orders?.items?.length > 0 ? orders?.items?.map((item: ItemProps) => console.log("ITEM AQUI: ", item)) : console.log("não existe item") :  console.log("não existe order") } */}
              Poster (2x), LoTR Poster (1x)
            </Text>
          </Flex>
        </Group>
        <Group gap={'sm'}>
          <Stack>
            <Text>
              {transactionTimestamp.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Stack>
          <Link
            href={`/transactions/transaction-detail`}
            onClick={() => findTransactionDetailsById(id)}
          >
            <IconArrowBadgeRightFilled
              style={{ width: '24px', height: '24px', marginTop: '5px', color: '#666' }}
            />
          </Link>
        </Group>
      </Group>
    </Container>
  );
}
