import { Avatar, Button, Container, Flex, Group, Popover, Select, Text } from '@mantine/core';
import useStyles from './sale-item.styles';
import { IconMoneybag } from '@tabler/icons-react';
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
}

function usdToEthConversionString(priceUSD: number) {
  // [TODO: add logic to check showPriceInEthereum flag and fetch ethereum conversion rate
  return `${0.0005} ETH`;
}

function generateUISelectOptionsFromItemStockAvailability(stock: number): number[] {
  return Array.from({ length: stock }, (_, index) => index + 1);
}

export default function SaleItem(props: SaleItemProps) {
  const { classes } = useStyles();
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Container w={'100%'} pl={0} pr={0}>
      <Group position="apart" mb={30}>
        <Group w={'50%'}>
          <Avatar src={props.thumbnail} size={54} />
          <Flex justify="flex-start" align="flex-start" direction="column" wrap="wrap">
            <Text className={classes.itemTitle}>{props.name.substring(0, 12)}{props.name.length > 10 ? '..' : ""}</Text>
            <Text c="dimmed">{props.stock} in stock</Text>
          </Flex>
        </Group>
        {!props.isInCart ? (
          <Group w={'20%'}>
            <Flex justify="flex-end" align="flex-end" direction="row" wrap="wrap" mt={-15}>
              {props.exclude_select_units ? (
                <></>
              ) : (
                <Select
                  size='sm'

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
          </Group>
        ) : (
          <Group>
            <Flex justify="flex-end" align="flex-start" direction="column" wrap="wrap" mt={10}>
              <Text className={classes.itemTitle}>{props.amount} units</Text>
              <Text fz="xs" c="dimmed">
                {props.priceUSD.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}{' '}
                each
              </Text>
            </Flex>
          </Group>
        )}
        <Flex
          w={'15%'}
          justify="flex-end"
          align="flex-start"
          direction="row"
          wrap="wrap"
          mt={-5}
          mr={5}
        >

          {props.showPriceInEthereum &&
            <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
              <Popover.Target>
                <Text onMouseEnter={open} onMouseLeave={close} className={classes.itemTitle} mt={props.showPriceInEthereum ? 0 : -20}>
                  {!props.isInCart
                    ? props.priceUSD.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                    : (props.priceUSD * Number(props.amount)).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                </Text>
              </Popover.Target>
              <Popover.Dropdown style={{ pointerEvents: 'none' }}>
                <Text fz="xs" c="dimmed" size="sm">{usdToEthConversionString(props.priceUSD)}</Text>
              </Popover.Dropdown>
            </Popover>
          }
        </Flex>
      </Group>
    </Container>
  );
}

