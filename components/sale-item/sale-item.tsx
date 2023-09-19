import { Avatar, Text, Group, Flex, Container, Select } from '@mantine/core';
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

function selectStockArray(units: number): number[] {
  const stock: number[] = Array.from({ length: units }, (_, index) => index + 1);

  return stock;
}

export default function SaleItem(props: SaleItemProps) {
  const { classes } = useStyles();
  return (
    <Container w={"100%"} pl={0} pr={0}>
      <Group position="apart" mb={30}>
        <Group w={'75%'}>
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
        <Group w={'10%'}>
          <Flex
            justify="flex-end"
            align="flex-end"
            direction="row"
            wrap="wrap"
            mt={-15}
          >
            <Select
              data={selectStockArray(Number(props.stock)).map((unit) => ({
                value: String(unit),
                label: String(unit),
              }))}
              onChange={(e) => {
              }}

            />
          </Flex>
        </Group>
        <Flex
          w={'10%'}
          justify="flex-end"
          align="flex-start"
          direction="row"
          wrap="wrap"
          mt={10}
          mr={5}
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