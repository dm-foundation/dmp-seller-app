import { Title, Text, Button, Flex, createStyles } from '@mantine/core';
import { ConnectKitButton } from 'connectkit';
import { useAccount, useDisconnect } from 'wagmi'


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
  link: {
    textDecoration: 'none',
    textDecorationColor: '#fff',
    color: '#fff'
  }
}));

import styled from "styled-components";
const StyledButton = styled.button`
  padding: 14px 24px;
  color: #ffffff;
  background: #000;
  font-size: 16px;
  font-weight: 500;
`;

export default function Login() {
  const { classes } = useStyles();
  const { disconnect } = useDisconnect()
  const { isConnected } = useAccount()

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
        <ConnectKitButton.Custom>
          {({ isConnected, truncatedAddress, ensName }) => (
            <StyledButton>
              {isConnected ? ensName ??
                truncatedAddress : "Sign in with Ethereum"}
            </StyledButton>
          )}
        </ConnectKitButton.Custom>
        {isConnected && <Button color="dark" w={"100%"} size="lg" onClick={() => disconnect()}>Disconnect from wallet</Button>}
      </Flex >
    </>
  );
}
