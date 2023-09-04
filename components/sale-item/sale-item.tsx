import { Avatar, Text, Group, Flex, Container } from '@mantine/core';
import useStyles from './sale-item.styles';

interface SaleItemProps {
    thumbnail: string;
    name: string;
    stock: number;
    price_usd: number;
    include_price_ethereum: boolean;
}

function usdToEthConversionString(price_usd: number) {
    return `${0.0005} ETH`;
}

export default function SaleItem({ thumbnail, name, stock, price_usd, include_price_ethereum }: SaleItemProps) {
    const { classes } = useStyles();
    return (
        <Container w={"100%"} pl={0} pr={0}>
            <Group position="apart" mb={15}>
                <Group>
                    <Avatar src={thumbnail} size={64} />
                    <Flex
                        justify="flex-start"
                        align="flex-start"
                        direction="column"
                        wrap="wrap"
                    >
                        <Text className={classes.itemTitle}>{name}</Text>
                        <Text c='dimmed'>
                            {stock} in stock
                        </Text>
                    </Flex>
                </Group>
                <Flex
                    justify="flex-start"
                    align="flex-end"
                    direction="column"
                    gap={2}
                    wrap="wrap"
                >
                    <Text className={classes.itemTitle} mt={include_price_ethereum ? 0 : -20}>{price_usd.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                    </Text>
                    {include_price_ethereum && <Text fz="xs" c="dimmed" >{usdToEthConversionString(price_usd)}</Text>}
                </Flex>
            </ Group >
        </Container >
    );
}