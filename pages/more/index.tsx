import { Title, Flex, Button, Divider } from '@mantine/core';
import useStyles from './more.styles';
import Layout from '../../components/layout';
import { IconBuildingStore, IconSettings, IconZoomMoney } from '@tabler/icons-react';
import Link from 'next/link';
export default function Transactions() {
  const { classes } = useStyles();

  return (
    <>
      <Layout>
        <Title className={classes.title} size="sm" mb="xl" mt="xl">
          Welcome to Mass Market
        </Title>
        <Divider orientation="horizontal" w={"100%"} mb="xl" mt="xl" />
        <Title className={classes.subtitle}>
          My Awesome Store
        </Title>
        <Flex
          mih={50}
          gap="sm"
          justify="flex-start"
          align="flex-start"
          direction="column"
          wrap="wrap"
        >
          <Button className={classes.button} leftIcon={<IconBuildingStore style={{ width: '28px', height: '28px' }} />} variant="black" color="gray">
            <Link className={classes.link} href={'/more/items'}>
              Items
            </Link>
          </Button>
          <Button className={classes.button} leftIcon={<IconZoomMoney style={{ width: '28px', height: '28px' }} />} variant="black" color="gray">
            <Link className={classes.link} href={'/more/earnings'}>
              Earnings
            </Link>
          </Button>
          <Button className={classes.button} leftIcon={<IconSettings style={{ width: '28px', height: '28px' }} />} variant="black" color="gray">
            <Link className={classes.link} href={'/more/settings'}>
              Settings
            </Link>
          </Button>
        </Flex>
      </Layout >
    </>
  );
}
