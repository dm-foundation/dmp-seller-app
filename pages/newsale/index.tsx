import { Title, Text, Button, Flex } from '@mantine/core';
import useStyles from './newsale.styles';
import Layout from '../../components/layout';
export default function NewSale() {
  const { classes } = useStyles();

  return (
    <>
      <Layout >
        <Title className={classes.title} size="md" mb="sm" mt="xl">
          New Sale
        </Title>
      </Layout >
    </>
  );
}
