import { Title, Text, Button, Flex, createStyles, Card, Container } from '@mantine/core';
import Link from 'next/link';
import Layout from '../../../components/layout';

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
    <Container w={"90%"}>
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
        <Card shadow="sm" padding="lg" radius="md" withBorder w={"100%"}>
          <Button color="gray" w={"100%"} size="lg" mb={30} >
            X
          </Button>
          <Button color="gray" w={"100%"} size="lg" mb={30}>
            Y
          </Button>
          <Button color="gray" w={"100%"} size="lg" mb={30}>
            Z
          </Button>
        </Card>
      </Flex >
    </Container>
  );
}
