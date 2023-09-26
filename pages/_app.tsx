import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import React, { useEffect, useState } from 'react';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { sepolia } from '@wagmi/core/chains';
import { ContextProvider } from '@/providers/context.provider';
import '@mantine/core/styles.css';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Browser Wallet',
        shimDisconnect: true,
      },
    }),
    new CoinbaseWalletConnector({
      options: {
        appName: 'dmp-mass-market',
        jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/{process.env.ALCHEMY_ID}`,
      },
    }),
    new WalletConnectConnector({
      options: {
        projectId: '2d83349a196bd3ad767d8a4c7b57ddf4',
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <ContextProvider>
      <>
        <Head>
          <title>Mass Market</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
        </Head>

        <MantineProvider>
          <WagmiConfig config={config}>{mounted && <Component {...pageProps} />}</WagmiConfig>
        </MantineProvider>
      </>
    </ContextProvider>
  );
}
