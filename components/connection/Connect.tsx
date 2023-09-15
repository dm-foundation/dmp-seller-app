'use client';

import get from '@/api/api';
import fetch from '@/api/api';
import { AppContext } from '@/context';
import { Button, Card, Flex, createStyles } from '@mantine/core';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { BaseError } from 'viem';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const useStyles = createStyles((theme) => ({
  link: {
    textDecoration: 'none',
    textDecorationColor: '#fff',
    color: '#666',
  },
}));
<Card shadow="sm" padding="lg" radius="md" withBorder w={'100%'}>
  <Button color="gray" w={'100%'} size="lg" mb={30}>
    X
  </Button>
  <Button color="gray" w={'100%'} size="lg" mb={30}>
    Y
  </Button>
  <Button color="gray" w={'100%'} size="lg" mb={30}>
    Z
  </Button>
</Card>;

export function Connect() {
  const { classes } = useStyles();
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const context = useContext(AppContext);

  async function fetchWalletStore() {
    const walletAddressData = await get(`/wallet-address/${address}`);
    const storeData = await get(`/store/${walletAddressData?.storeId}`);
    const walletStoreObj = { ...storeData, ...walletAddressData };
    context.updateContext(walletStoreObj);
  }

  return (
    <div>
      {isConnected && (
        <>
          <Link className={classes.link} href={'/newsale'} style={{ display: 'contents' }}>
            <Button color="dark" size="lg" onClick={fetchWalletStore}>
              Go to your store
            </Button>
          </Link>
        </>
      )}

      {!isConnected && (
        <Card shadow="sm" padding="lg" radius="md" withBorder w={'100%'}>
          <Flex direction="column" gap={20}>
            {connectors
              .filter((c) => c.ready && c.id !== connector?.id)
              .map((c) => (
                <Button
                  key={c.id}
                  color="dark"
                  size="lg"
                  onClick={() => {
                    connect({ connector: c });
                  }}
                >
                  {c.name}
                </Button>
              ))}
          </Flex>
        </Card>
      )}
      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  );
}
