import { Title, Flex, Group } from '@mantine/core';
import Layout from '../../components/layout';
import { IconBuildingStore, IconSettings, IconZoomMoney } from '@tabler/icons-react';
import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from '@/context';
import classes from '@/pages/App.module.css';

export default function More() {
  const { walletStoreContext } = useContext(AppContext);

  return (
    <Layout title="Welcome to Mass Market">
      <Title className={classes.subtitle_more}>
        {walletStoreContext?.name || "Store"}
      </Title>
      <Flex
        justify="flex-start"
        align="flex-start"
        direction="column"
        wrap="nowrap"
        gap={12}
        mt={30}
      >
        <Link className={classes.link_more} href={'/more/items'}>
          Items
        </Link>
        <Link className={classes.link_more} href={'/more/earnings'}>
          Earnings
        </Link>
        <Link className={classes.link_more} href={'/more/settings'}>
          Settings
        </Link>
      </Flex>
    </Layout >
  );
}
