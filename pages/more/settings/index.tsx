import { Title, TextInput, Flex, Button, Divider, Input, Box, createStyles } from '@mantine/core';
import Layout from '../../../components/layout';
import { IconAt, } from '@tabler/icons-react';
import { useAccount, useDisconnect } from "wagmi";
import { useEffect, useState } from 'react';

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
}));

export default function Transactions() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect()
  const [dummy, reload] = useState(false);

  const [isUserConnected, setIsUserConnected] = useState(false)
  useEffect(() => {
    setIsUserConnected(isConnected)
  }, []);

  return (
    <Layout title="Settings">
      <Flex
        direction="column"
        justify="center"
        gap={10}
        mb={100}
        w={"95%"}
        ta='left'
      >
        <TextInput
          label="Email"
          size="md"
          icon={<IconAt />}
          withAsterisk
          placeholder="Your email"
        />
        <TextInput
          label="Store Name"
          size="md"
          withAsterisk
          placeholder="Your store name"
        />
        <TextInput
          label="ETH Address"
          size="md"
          withAsterisk
          description="Payments will be sent here"
          placeholder="0x..."
          disabled
          value={address}
        />
        <Button color="dark" size="lg" disabled={!isUserConnected} onClick={() => { disconnect(); window.location.href = '/' }}>
          Disconnect from wallet
        </Button>
        <Button color="dark" size="lg">
          Save
        </Button>
      </Flex>
    </Layout>
  );
}
