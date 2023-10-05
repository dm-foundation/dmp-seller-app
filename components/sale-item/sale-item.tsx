import classes from '@/pages/App.module.css';
import { Avatar, Container, Flex, Grid, Group, Select, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface SaleItemProps {
  id: number;
  thumbnail: string;
  name: string;
  stock: number;
  amount?: number;
  priceUSD: number;
  itemHandler: any;
  showPriceInEthereum: boolean;
  isInCart: boolean;
  exclude_select_units?: boolean;
  onSelectItem?: any;
  cursorPointer?: boolean;
}

function generateUISelectOptionsFromItemStockAvailability(stock: number): number[] {
  return Array.from({ length: stock }, (_, index) => index + 1);
}

export default function SaleItem(props: SaleItemProps) {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Container
      w={'100%'}
      pl={0}
      pr={0}
      mr={0}
      ml={0}
      mb={10}
      style={props.cursorPointer ? { cursor: "pointer" } : undefined}
    >
      <Grid gutter="md">
        <Grid.Col span="content">
          <Avatar variant="light" radius="xs" size="lg" src={props.thumbnail} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Flex justify="flex-start" align="flex-start" direction="column" wrap="wrap" mt={5}>
            <Text fz={'md'} className={classes.itemTitle}>
              {props.name.substring(0, 30)}
              {props.name.length > 30 ? '..' : ''}
            </Text>
            <Text size={'xs'} c="dimmed">
              {props.stock} in stock
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span="content">
          {!props.isInCart ? (
            <Flex justify="flex-end" align="flex-end" direction="column" wrap="wrap" mt={5} w={'30%'}>
              {props.exclude_select_units ? (
                <></>
              ) : (
                <Select
                  size="sm"
                  data={generateUISelectOptionsFromItemStockAvailability(Number(props.stock)).map(
                    (unit) => ({
                      value: String(unit),
                      label: String(unit),
                    })
                  )}
                  onChange={(value) => {
                    props.itemHandler(props.id, Number(value));
                  }}
                />
              )}
            </Flex>
          ) : (
            <Flex justify="flex-end" align="flex-end" direction="column" wrap="wrap" mt={10}>
              <Text className={classes.itemTitle}>{props.amount} units</Text>
              <Text fz="xs" c="dimmed">
                {props.priceUSD.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}{' '}
                each
              </Text>
            </Flex>
          )}
        </Grid.Col>
        <Grid.Col span="content">
          <Text
            onMouseEnter={open}
            onMouseLeave={close}
            className={classes.itemTitle}
            mt={10}
            size="md"
          >
            {!props.isInCart
              ? props.priceUSD.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
              : (props.priceUSD * Number(props.amount)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </Text>
        </Grid.Col>
      </Grid>
    </Container >
  );
}
