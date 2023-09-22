import Layout from '@/components/layout';
import { Button, Flex, TextInput, createStyles } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload } from '@tabler/icons-react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  link: {
    color: '#666',
  },
}));

export default function Transactions() {
  const { classes } = useStyles();
  return (
    <Layout title="Edit Item">
      <Flex direction="column" justify="center" gap={10} mb={100} w={'95%'} ta="left">
        <Dropzone
          onDrop={(files) => console.log('accepted files', files)}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Flex>
            <IconUpload />
            Drag 'n' drop some files here, or click to select files
          </Flex>
        </Dropzone>
        <TextInput label="Name" size="md" placeholder="e.g. Milan Travel Poster" />
        <TextInput label="SKU" size="md" placeholder="MIL-001" />
        <TextInput label="Price" size="md" placeholder="$ 0.00" />
        <TextInput label="Units for Sale" size="md" placeholder="12" />
        <Link
          className={classes.link}
          href={'/more/items'}
          style={{ display: 'contents' }}
        >
          <Button color="dark" w={'100%'} size="lg">
            Save
          </Button>
        </Link>
      </Flex>
    </Layout>
  );
}
