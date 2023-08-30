import { Avatar, Text, Group, Flex } from '@mantine/core';
import useStyles from './sale-item.styles';

interface SaleItemProps {
    thumbnail: string;
    name: string;
    stock: number;
    price_usd: number;
    price_ethereum: number;
}

export default function SaleItem({ thumbnail, name, stock, price_usd, price_ethereum }: SaleItemProps) {
    const { classes } = useStyles();
    return (
        <div>
            <Group position='apart' spacing="xl" mb={15}>
                <Avatar src={thumbnail} size={64} />
                <Group>
                    <Flex
                        justify="flex-start"
                        align="flex-start"
                        direction="column"
                        wrap="wrap"
                    >
                        <Text className={classes.itemTitle}>{name}</Text>
                        <Text className={classes.stock}>
                            {stock} in stock
                        </Text>
                    </Flex>
                    <Flex
                        justify="flex-start"
                        align="flex-end"
                        direction="column"
                        gap={2}
                        wrap="wrap"
                    >
                        <Text className={classes.itemTitle}>{price_usd.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}
                        </Text>
                        <Text fz="xs" c="dimmed">{price_ethereum} ETH
                        </Text>

                    </Flex>
                </Group>
            </Group>
        </div>
    );
}