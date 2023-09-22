import Layout from '@/components/layout';
import { AppContext } from '@/context';
import { Button, Flex, TextInput, createStyles } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload } from '@tabler/icons-react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { post } from '../../../../api/api';

const useStyles = createStyles((theme) => ({
  link: {
    color: '#666',
  },
}));

export default function CreateItems() {
  const { classes } = useStyles();
  const [name, setName] = useState<string>();
  const [sku, setSku] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [units, setUnits] = useState<number>();
  const [thumbnail, setThumbnail] = useState<any>();
  const { walletStoreContext } = useContext(AppContext);

  async function handleSubmit() {
    if (name && sku && price && units && thumbnail) {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('sku', sku);
      formData.append('price', price.toString());
      formData.append('units', units.toString());
      formData.append('thumbnail', thumbnail[0]);
      formData.append('storeId', walletStoreContext?.storeId.toString() || '');

      try {
        const createdItem = await post('/item', formData);
      } catch (error) {
        console.error('Error while creating item:', error);
      }
    } else {
      console.error('Please fill all fields');
    }
  }
  useEffect(() => {
    console.log('🚀 ~ file: index.tsx:25 ~ CreateItems ~ thumbnail:', thumbnail);
  }, [thumbnail]);
  return (
    <Layout title="Create Item">
      <Flex direction="column" justify="center" gap={10} mb={100} w={'95%'} ta="left">
        <Dropzone
          onDrop={(files) => setThumbnail(files)}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          {thumbnail ? (
            <Flex justify={'center'} align="center" w={'100%'}>
              <IconUpload />
              {thumbnail[0]?.name}
            </Flex>
          ) : (
            <Flex justify={'center'} align="center" w={'100%'}>
              <IconUpload />
              Drag 'n' drop some files here, or click to select files
            </Flex>
          )}
        </Dropzone>
        <TextInput
          label="Name"
          size="md"
          placeholder="e.g. Milan Travel Poster"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="SKU"
          size="md"
          type="text"
          placeholder="MIL-001"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
        <TextInput
          label="Price"
          size="md"
          type="number"
          placeholder="$ 0.00"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <TextInput
          label="Units for Sale"
          size="md"
          type="number"
          placeholder="12"
          value={units}
          onChange={(e) => setUnits(Number(e.target.value))}
        />
        <Link className={classes.link} href={'/more/items'} style={{ display: 'contents' }}>
          <Button color="dark" w={'100%'} size="lg" onClick={handleSubmit}>
            Add new item
          </Button>
        </Link>
      </Flex>
    </Layout>
  );
}
