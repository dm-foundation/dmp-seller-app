import Layout from '@/components/layout';
import { Button, Flex, TextInput, createStyles } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: -1,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    opacity: 0.65,
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: -1,
    textAlign: 'left',
    marginLeft: '15px',
    marginBottom: '15px',
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
}));

export default function Transactions() {

  return (
    <Layout title="Create Item">
      <Flex
        direction="column"
        justify="center"
        gap={10}
        mb={100}
        w={"95%"}
        ta='left'
      >
        <Dropzone onDrop={(files) => console.log('accepted files', files)}>
        </ Dropzone>
        <TextInput
          label="Name"
          size="md"
          placeholder="e.g. Milan Travel Poster"
        />
        <TextInput
          label="SKU"
          size="md"
          placeholder="MIL-001"
        />
        <TextInput
          label="Price"
          size="md"
          placeholder="$ 0.00"
        />
        <TextInput
          label="Units for Sale"
          size="md"
          placeholder="12"
        />
        <Button color="dark" w={"100%"} size="lg">Add new item</Button>
      </Flex>
    </Layout>
  );
}
