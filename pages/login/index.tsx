import { Title, Text, Button, Flex, createStyles } from '@mantine/core';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import NewSale from '../newsale';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Connected from '@/components/connection/Connected';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 62,
    fontWeight: 900,
    letterSpacing: -2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  loginbox: {
    marginBottom: 40,
    margin: 30,
    fontSize: 30,
  },
}));

export default function Login() {
  const { classes } = useStyles();
  const { isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const [isUserConnected, setIsUserConnected] = useState(false)

  useEffect(() => {
    if (isConnected)
      setIsUserConnected(true);
  }, [])

  if (isUserConnected) {
    return (
      <Connected>
        <NewSale />
      </Connected>
    );
  }
  return (
    <>
      <Flex className={classes.loginbox}
        mih={50}
        gap="sm"
        justify="center"
        align="center"
        direction="column"
      >
        <Title className={classes.title} size="xl" mb="sm" mt="md">
          Mass Market
        </Title>
        <Text className={classes.subtitle} color="dimmed" size="md" sx={{ maxWidth: 580 }} mx="auto" mb="lg">
          Sign in with an Ethereum address to set up your store
        </Text>
        <Link href={'/login/wallet-selection'}>
          <Button color="dark" size="lg">
            Sign in with Ethereum
          </Button>
        </Link>
      </Flex >
    </>
  );
}
