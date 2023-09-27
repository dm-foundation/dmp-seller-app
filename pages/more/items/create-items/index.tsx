import Layout from '@/components/layout';
import { AppContext } from '@/context';
import { Button, Flex, TextInput } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { post } from '@/api/api';
import classes from '@/pages/App.module.css';

export default function CreateItems() {
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

  const handleClearThumbnail = () => {
    setThumbnail(null);
  };

  return (
    <Layout title="Create Item">
      <Flex direction="column" justify="center" gap={10} mb={100} w={'95%'} ta="left">
        <Flex
          style={{
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Dropzone
            onDrop={(files) => setThumbnail(files)}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            {thumbnail ? <IconX onClick={handleClearThumbnail} /> : null}
            {thumbnail ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={URL.createObjectURL(thumbnail[0])}
                  alt="Thumbnail"
                  style={{ width: '40%', objectFit: 'cover' }}
                />

              </div>
            ) : (
              <Flex justify={'center'} align="center" w={'100%'}>
                <IconUpload />
                Drag 'n' drop a file here, or click to select file
              </Flex>
            )}
          </Dropzone>
        </Flex>
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
          placeholder="1"
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
