import { Text, Group, Flex, Stack, Divider, Container } from '@mantine/core';
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
        <Container w={"100%"} pl={0} pr={0}>
            <Divider orientation="horizontal" w={"100%"} />
            <Group position="apart" mb={15} mt={15}>
                <Group spacing="xl">
                    <Flex
                        justify="flex-start"
                        align="flex-start"
                        direction="column"
                        wrap="wrap"
                        gap={0}
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
                </Group>
                <Stack>
                    <Text className={classes.profit} fz="md" mt={-20}>
                        +{item_total_price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}
                    </Text>
                </Stack>

            </Group>
        </Container >
    );
}