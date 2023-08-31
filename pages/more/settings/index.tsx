import { Title, TextInput, Flex, Button, Divider, Input, Box, createStyles } from '@mantine/core';
import Layout from '../../../components/layout';
import { IconAt, } from '@tabler/icons-react';

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
  totalEarnings: {
    fontSize: 44,
    fontWeight: 800,
  }
}));

export default function Transactions() {
  const { classes } = useStyles();

  return (
    <>
      <Layout>
        <Title className={classes.title} size="sm" align='center' mb="xl" mt="xl">
          Settings
        </Title>
        <Divider orientation="horizontal" w={"100%"} mb="xl" mt="xl" />
        <Flex
          direction="column"
          justify="center"
          gap={10}
          mb={100}
          ml={20}
          mr={20}
          ta='left'
        >
          <TextInput w={"95%"}
            label="Email"
            size="md"
            icon={<IconAt />}
            withAsterisk
            placeholder="Your email"
          />
          <TextInput w={"95%"}
            label="Store Name"
            size="md"
            withAsterisk
            placeholder="Your store name"
          />
          <TextInput w={"95%"}
            label="ETH Address"
            size="md"
            withAsterisk
            description="Payments will be sent here"
            placeholder="0x..."
          />
          <Button size="md" mt={20} w={"95%"}>Save</Button>
        </Flex>
      </Layout >
    </>
  );
}
