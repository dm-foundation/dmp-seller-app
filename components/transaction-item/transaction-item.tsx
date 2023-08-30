import { Box, Text, Group, Flex, Stack, ActionIcon } from '@mantine/core';
import { IconReceipt2, IconChevronRight } from '@tabler/icons-react';
import useStyles from './transaction-item.styles';

interface TransactionItemProps {
    seller_name: string;
    price_usd: number;
    transaction_timestamp: Date;
}

export default function TransactionItem({ seller_name, price_usd, transaction_timestamp }: TransactionItemProps) {
    const { classes } = useStyles();
    return (
        <div>
            <Group spacing="sm" mb={15}>
                <Box>
                    <IconReceipt2 style={{ width: '32', height: '32', marginTop: '-10px' }} />
                </Box>
                <Group spacing="xl">
                    <Flex
                        justify="flex-start"
                        align="flex-start"
                        direction="column"
                        wrap="wrap"
                    >
                        <Text className={classes.itemTitle}>
                            {price_usd.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </Text>
                        <Text c="dimmed" fz="xs">
                            {seller_name}
                        </Text>
                    </Flex>
                    <Stack>
                        <Text className={classes.itemTitle} fz="md" mt={-20}>
                            {transaction_timestamp.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </Text>
                    </Stack>
                    <ActionIcon>
                        <IconChevronRight style={{ width: '36px', height: '36px', marginTop: '-10px' }} />
                    </ActionIcon>
                </Group>
            </Group>
        </div >
    );
}