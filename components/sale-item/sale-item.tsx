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

export default function SaleItem(props: SaleItemProps) {
    const { classes } = useStyles();
    return (
        <Container w={"100%"} pl={0} pr={0}>
            <Group position="apart" mb={15}>
                <Group>
                    <Avatar src={props.thumbnail} size={64} />
                    <Flex
                        justify="flex-start"
                        align="flex-start"
                        direction="column"
                        wrap="wrap"
                    >
                        <Text className={classes.itemTitle}>{props.name}</Text>
                        <Text c='dimmed'>
                            {props.stock} in stock
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
                    <Text className={classes.itemTitle} mt={props.include_price_ethereum ? 0 : -20}>{props.price_usd.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                    </Text>
                    {props.include_price_ethereum && <Text fz="xs" c="dimmed" >{usdToEthConversionString(props.price_usd)}</Text>}
                </Flex>
            </ Group >
        </Container >
    );
}