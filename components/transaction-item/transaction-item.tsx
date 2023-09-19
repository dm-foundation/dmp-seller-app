import { Text, Group, Flex, Stack, ActionIcon, Container } from '@mantine/core';
import { IconReceipt2, IconChevronRight } from '@tabler/icons-react';
import useStyles from './transaction-item.styles';

interface TransactionItemProps {
    seller_name: string;
    priceUSD: number;
    transaction_timestamp: Date;
}

export default function TransactionItem({ seller_name, priceUSD, transaction_timestamp }: TransactionItemProps) {
    const { classes } = useStyles();
    return (
        <Container w={"100%"} pl={0} pr={0}>
            <Group position="apart" mb={15}>
                <Group position='left'>
                    <IconReceipt2 style={{ width: '40', height: '40', marginTop: '5px' }} />
                    <Flex
                        justify="flex-start"
                        align="flex-start"
                        direction="column"
                        wrap="wrap"
                        gap={0.5}
                    >
                        <Text className={classes.itemTitle} mb={-5}>
                            {priceUSD.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </Text>
                        <Text c="dimmed" fz="xs">
                            {seller_name}
                        </Text>
                    </Flex>
                </Group>
                <Group spacing={'xs'}>
                    <Stack>
                        <Text className={classes.itemTitle} fz="md" mt={-18}>
                            {transaction_timestamp.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </Text>
                    </Stack>
                    <ActionIcon>
                        <IconChevronRight style={{ width: '36px', height: '36px', marginTop: '-16px' }} />
                    </ActionIcon>
                </Group>
            </Group>
        </Container >
    );
}