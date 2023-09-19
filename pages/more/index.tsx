import { Title, Flex, Button, createStyles } from '@mantine/core';
import Layout from '../../components/layout';
import { IconBuildingStore, IconSettings, IconZoomMoney } from '@tabler/icons-react';
import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from '@/context';

const useStyles = createStyles((theme) => ({
  subtitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    opacity: 0.65,
    fontSize: 26,
    fontWeight: 800,
    letterSpacing: -1,
    textAlign: 'left',
    marginLeft: '15px',
    marginBottom: '15px'
  },
  button: {
    opacity: 0.8,
  },
  link: {
    fontSize: 22,
    textDecoration: 'none',
    textDecorationColor: '#fff',
    color: '#666',
  }
}));


export default function More() {
  const { classes } = useStyles();
  const { walletStoreContext } = useContext(AppContext);

  return (
    <Layout title="Welcome to Mass Market">
      <Title className={classes.subtitle}>
        {walletStoreContext?.name}
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
  );
}
