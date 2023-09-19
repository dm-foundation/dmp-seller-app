import { Avatar, Text, Group, Flex, Container, Select } from '@mantine/core';
import useStyles from './sale-item.styles';
import { useState } from 'react';

interface SaleItemProps {
  id?: number;
  thumbnail: string;
  name: string;
  stock: number;
  price_usd: number;
  include_price_ethereum: boolean;
  include_select_units?: boolean;
  handleSelectedItems?: any;
  handleAmountChange?: any;
  amount?: number
}

function usdToEthConversionString(price_usd: number) {
  return `${0.0005} ETH`;
}

function selectStockArray(units: number): number[] {
  const stock: number[] = Array.from({ length: units + 1 }, (_, index) => index);
  return stock;
}

export default function SaleItem(props: SaleItemProps) {
  const { classes } = useStyles();

  return (
    <Container w={'100%'} pl={0} pr={0}>
      <Group position="apart" mb={15}>
        <Group>
          <Avatar src={props.thumbnail} size={64} />
          <Flex justify="flex-start" align="flex-start" direction="column" wrap="wrap">
            <Text className={classes.itemTitle}>{props.name}</Text>
            <Text c="dimmed">{props.stock} in stock</Text>
          </Flex>
        </Group>
        {props.include_select_units ? (
          <Flex
            h={'100%'}
            align={'center'}
            justify={'between'}
            direction="row"
            gap={10}
            wrap="wrap"
          >
            <Text
              style={{ marginTop: 0 }}
              className={classes.itemTitle}
              mt={props.include_price_ethereum ? 0 : -20}
            >
              {props.price_usd.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Text>
            {props.include_price_ethereum && (
              <Text fz="xs" c="dimmed">
                {usdToEthConversionString(props.price_usd)}
              </Text>
            )}
            <Container w={'30%'} style={{ marginTop: 0, marginBottom: 0 }}>
              <Select
                data={selectStockArray(Number(props.stock)).map((unit) => ({
                  value: String(unit),
                  label: String(unit),
                }))}
                onChange={(e) => {
                  props.handleAmountChange(Number(e));
                  props.handleSelectedItems(props)
                }}

              />
            </Container>
          </Flex>
        ) : (
          <Flex justify="flex-start" align="flex-end" direction="column" gap={2} wrap="wrap">
            <Text className={classes.itemTitle} mt={props.include_price_ethereum ? 0 : -20}>
              {props.price_usd.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Text>
            {props.include_price_ethereum && (
              <Text fz="xs" c="dimmed">
                {usdToEthConversionString(props.price_usd)}
              </Text>
            )}
          </Flex>
        )}
      </Group>
    </Container>
  );
}
