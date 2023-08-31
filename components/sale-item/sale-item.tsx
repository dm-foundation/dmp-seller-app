import { Avatar, Text, Group, Flex } from '@mantine/core';
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
                        <Text className={classes.itemTitle} mt={include_price_ethereum ? 0 : -20}>{price_usd.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}
                        </Text>
                        {include_price_ethereum && <Text fz="xs" c="dimmed" >{usdToEthConversionString(price_usd)}</Text>}
                    </Flex>
                </Group>
            </Group>
        </div >
    );
}