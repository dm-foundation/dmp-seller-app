import { Avatar, Text, Group, Flex } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
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
            <Group spacing="sm" mb={30}>
                <Avatar src={thumbnail} size={64} radius="sm" />
                <Group>
                    <Flex
                        mih={50}
                        align="left"
                        direction="column"
                        wrap="wrap"
                    >
                        <Text>
                            {name}
                        </Text>
                        <Text className={classes.stock}>
                            {stock} in stock
                        </Text>
                    </Flex>
                    <Flex
                        mih={50}
                        align="left"
                        direction="column"
                        justify="center"
                        wrap="wrap"
                    >
                        <Text>
                            $ {price_usd}
                        </Text>
                        <Text fz="xs" c="dimmed" pt={-5}
                        >
                            {price_ethereum} ETH
                        </Text>
                    </Flex>
                </Group>
            </Group>
        </div>
    );
}