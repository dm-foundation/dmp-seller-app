import { TextInput, Flex, Button } from '@mantine/core';
import Layout from '../../../components/layout';
import { IconAt, } from '@tabler/icons-react';
import { useAccount, useDisconnect } from "wagmi";
import { useContext, useEffect, useState } from 'react';
import { ContextType } from '@/context/contextTypes';
import { MyContext } from '@/context/myContext';
import get from '@/api/api';

export default function Settings() {
  const [isUserConnected, setIsUserConnected] = useState(false)
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { ctx, updateCtx } = useContext(MyContext) as ContextType;

  async function fetchStoreInfo() {
    try {
      const walletData = await get(`/wallet-address/${address}`);
      ctx.ethAddress = walletData.ethAddress;
      ctx.storeId = walletData.storeId;

      const storeData = await get(`/store/${ctx.storeId}`);
      ctx.storeName = storeData.name;
      ctx.storeEmail = storeData.email;

      updateCtx(ctx);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setIsUserConnected(isConnected)
    if (isConnected) {
      fetchStoreInfo();
    }
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
          value={ctx.storeEmail}

        />
        <TextInput
          label="Store Name"
          size="md"
          withAsterisk
          placeholder="Your store name"
          value={ctx.storeName}
        />
        <TextInput
          label="ETH Address"
          size="md"
          withAsterisk
          description="Payments will be sent here"
          placeholder="0x..."
          disabled
          value={ctx.ethAddress}
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
