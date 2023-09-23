import { Title, Flex, Button } from '@mantine/core';
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
        {walletStoreContext?.name}
      </Title>
      <Flex
        justify="flex-start"
        align="flex-start"
        direction="column"
        wrap="nowrap"
      >
        <Button className={classes.button_more} leftSection={<IconBuildingStore style={{ width: '28px', height: '28px' }} />} size="xl" variant="light" color="gray" fullWidth>
          <Link className={classes.link_more} href={'/more/items'}>
            Items
          </Link>
        </Button>
        <Button className={classes.button_more} leftSection={<IconZoomMoney style={{ width: '28px', height: '28px' }} />} size="xl" variant="light" color="gray" fullWidth>
          <Link className={classes.link_more} href={'/more/earnings'}>
            Earnings
          </Link>
        </Button>
        <Button className={classes.button_more} leftSection={<IconSettings style={{ width: '28px', height: '28px' }} />} size="xl" variant="light" color="gray" fullWidth>
          <Link className={classes.link_more} href={'/more/settings'}>
            Settings
          </Link>
        </Button>
      </Flex>
    </Layout >
  );
}
