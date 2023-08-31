import { Title, TextInput, Flex, Button, Divider, Input, Box } from '@mantine/core';
import useStyles from '../more.styles';
import Layout from '../../../components/layout';
import { IconAt, } from '@tabler/icons-react';
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
