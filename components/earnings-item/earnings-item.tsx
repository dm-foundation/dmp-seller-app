import { Box, Text, Group, Flex, Stack, ActionIcon, Divider } from '@mantine/core';
import { IconReceipt2, IconChevronRight } from '@tabler/icons-react';
import useStyles from './earnings-item.styles';

interface EarningsItemProps {
    date: Date;
    item_name: string;
    item_count: number;
    item_total_price: number;
}

export default function EarningsItem({ date, item_name, item_count, item_total_price }: EarningsItemProps) {
    const { classes } = useStyles();
    return (
        <div>
            <Group spacing="sm" mb={15}>
                <Group spacing="xl">
                    <Divider orientation="horizontal" w={"100%"} />
                    <Flex
                        justify="flex-start"
                        align="flex-start"
                        direction="column"
                        wrap="wrap"
                    >
                        <Text className={classes.itemTitle}>
                            {date.toLocaleString('en-US', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'short',
                            })}
                        </Text>
                        <Text c="dimmed" fz="xs">
                            {item_count} {item_name}(s) sold
                        </Text>
                    </Flex>
                    <Stack>
                        <Text className={classes.profit} fz="md" mt={-20}>
                            +{item_total_price.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </Text>
                    </Stack>
                </Group>
            </Group>
        </div >
    );
}