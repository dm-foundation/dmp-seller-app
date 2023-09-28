import Layout from '@/components/layout';
import { Button, Flex, TextInput } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import classes from '@/pages/App.module.css';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context';
import { get, put } from '@/api/api';
import { useRouter } from 'next/router';

interface EditItemProps {
  id: number;
  name: string;
  sku: string;
  price: number;
  units: number;
  thumbnail: string;
}

export default function Transactions() {
  const [name, setName] = useState<string>();
  const [sku, setSku] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [units, setUnits] = useState<number>();
  const [thumbnail, setThumbnail] = useState<any>();
  const { walletStoreContext } = useContext(AppContext);
  const router = useRouter();
  const { itemId } = router.query;

  async function handleSubmit() {
    const formData: any = {};
    formData.name = name || '';
    formData.sku = sku || '';
    formData.price = price?.toString() || '';
    formData.units = units?.toString() || '';
    formData.storeId = walletStoreContext?.storeId.toString() || '';

    console.log("formData:", formData);

    try {
      const updatedItem = await put(`/item/${itemId}`, formData);
    } catch (error) {
      console.error('Error while creating item:', error);
    }
  }

  const handleClearThumbnail = () => {
    setThumbnail(null);
  };

  async function fetchSelectedItem() {
    const selectedItem = await get(`/item/${itemId}`);
    setName(selectedItem.name);
    setSku(selectedItem.sku);
    setPrice(selectedItem.price);
    setUnits(selectedItem.units);
    setThumbnail(selectedItem.thumbnail);
  }

  useEffect(() => {
    fetchSelectedItem();
  }, []);

  return (
    <Layout title="Edit Item">
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
            onDrop={(files) => {
              setThumbnail(files);
            }}
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
                <img src={thumbnail} alt="Thumbnail" style={{ width: '40%', objectFit: 'cover' }} />
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
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Price"
          size="md"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <TextInput
          label="SKU"
          size="md"
          type="text"
          value={sku}
          style={{ color: '#000'! }}
          disabled
        />
        <TextInput
          label="Units for Sale"
          size="md"
          type="number"
          value={units}
          style={{ color: '#000'! }}
          disabled
        />
        <Link className={classes.link} href={'/more/items'} style={{ display: 'contents' }}>
          <Button color="dark" w={'100%'} size="lg" onClick={handleSubmit}>
            Save
          </Button>
        </Link>
      </Flex>
    </Layout>
  );
}
