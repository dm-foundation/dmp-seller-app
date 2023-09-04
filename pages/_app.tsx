import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import React, { useEffect, useState } from 'react';
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
  ],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
  // walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID as string,
});


export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <>
      <Head>
        <title>Mass Market</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <WagmiConfig config={config}>
          {mounted && < Component {...pageProps} />}
        </WagmiConfig>
      </MantineProvider >
    </>
  );
}


