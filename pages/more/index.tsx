import { Title, Flex, Button, Divider, createStyles } from '@mantine/core';
import Layout from '../../components/layout';
import { IconBuildingStore, IconSettings, IconZoomMoney } from '@tabler/icons-react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: -1,
    textAlign: 'center'
  },
  subtitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    opacity: 0.65,
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: -1,
    textAlign: 'left',
    marginLeft: '15px',
    marginBottom: '15px'
  },
  button: {
    fontSize: 24,
    opacity: 0.8,
  },
  link: {
    textDecoration: 'none',
    textDecorationColor: '#fff',
    color: '#666',
  },
  totalEarnings: {
    fontSize: 44,
    fontWeight: 800,
  }
}));


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
