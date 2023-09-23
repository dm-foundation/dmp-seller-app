'use client';

import { get } from '@/api/api';
import { AppContext } from '@/context';
import { Button, Card, Flex } from '@mantine/core';
import Link from 'next/link';
import { useContext } from 'react';
import { BaseError } from 'viem';
import { useAccount, useConnect } from 'wagmi';
import classes from '@/pages/App.module.css';

export function Connect() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { updateContext } = useContext(AppContext);

  async function fetchWalletStore() {
    const walletAddressData = await get(`/wallet-address/${address}`);
    const storeData = await get(`/store/${walletAddressData?.storeId}`);
    const walletStoreObj = { ...storeData, ...walletAddressData };
    updateContext(walletStoreObj);
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
