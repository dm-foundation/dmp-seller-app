import { Title, TextInput, Flex, Button, Divider, Input, Box, createStyles } from '@mantine/core';
import Layout from '../../../components/layout';
import { IconAt, IconShoppingBag } from '@tabler/icons-react';
import { useAccount, useDisconnect } from 'wagmi';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context';

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: -1,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    opacity: 0.65,
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: -1,
    textAlign: 'left',
    marginLeft: '15px',
    marginBottom: '15px',
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
  const { disconnect } = useDisconnect();
  const [dummy, reload] = useState(false);
  const { walletStoreContext } = useContext(AppContext);

  const [isUserConnected, setIsUserConnected] = useState(false);

  const [storeName, setStoreName] = useState(walletStoreContext?.name || '');
  const [storeEmail, setStoreEmail] = useState(walletStoreContext?.email || '');

  const handleStoreNameChange = (event: any) => {
    setStoreName(event.target.value);
  };
  const handleStoreEmailChange = (event: any) => {
    setStoreEmail(event.target.value);
  };

  useEffect(() => {
    setIsUserConnected(isConnected);
  }, []);

  return (
    <Layout title="Settings">
      <Flex direction="column" justify="center" gap={10} mb={100} w={'95%'} ta="left">
        <TextInput
          label="Store Name"
          size="md"
          icon={<IconShoppingBag />}
          withAsterisk
          value={storeName}
          onChange={handleStoreNameChange}
        />
        <TextInput
          label="Email"
          size="md"
          icon={<IconAt />}
          withAsterisk
          value={storeEmail}
          onChange={handleStoreEmailChange}
        />
        <TextInput
          label="ETH Address"
          size="md"
          withAsterisk
          description="Payments will be sent here"
          placeholder="0x..."
          disabled
          value={walletStoreContext?.ethAddress}
        />
        <Button
          color="dark"
          size="lg"
          disabled={!isUserConnected}
          onClick={() => {
            disconnect();
            window.location.href = '/';
          }}
        >
          Disconnect from wallet
        </Button>
        <Button color="dark" size="lg">
          Save
        </Button>
      </Flex>
    </Layout>
  );
}
