import { Title, Text, Button, Flex, Image, BackgroundImage } from '@mantine/core';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import NewSale from '../newsale';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Connected from '@/components/connection/Connected';
import classes from '@/pages/App.module.css';

export default function Login() {
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
      <Flex className={classes.loginbox_login}
        mih={50}
        gap="sm"
        justify="center"
        align="center"
        direction="column"
      >
        <Title className={classes.title_login} size="xl" mb="sm" mt="md">
          Mass Market
        </Title>
        <Text className={classes.subtitle_login} size="md" mx="auto" mb="lg">
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
