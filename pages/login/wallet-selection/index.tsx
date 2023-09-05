import { Title, Text, Button, Flex, createStyles, Card, Container } from '@mantine/core';
import Link from 'next/link';
import Layout from '../../../components/layout';
import { Connect } from '@/components/connection/Connect';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: - 1,
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
    textDecorationColor: '#fff',
    color: '#fff'
  }
}));


export default function WalletSelector() {
  const { classes } = useStyles();

  return (
    <Container w={"90%"} mt={50} >
      <Flex
        mih={50}
        gap="sm"
        justify="center"
        align="center"
        direction="column"
      >
        <Title className={classes.title} size="xl" mb="sm" mt="md">
          Choose your preferred wallet
        </Title>
        <Connect />
      </Flex >
    </Container >
  );
}
