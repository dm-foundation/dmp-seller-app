import { Title, Text, Button, Flex, Divider, createStyles, Container } from '@mantine/core';
import Layout from '../../../components/layout';
import QRCode from "react-qr-code";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: - 1,
  },
  link: {
    textDecoration: 'none',
    textDecorationColor: '#fff',
    color: '#fff'
  }
}));


export default function PaymentScan() {
  const { classes } = useStyles();

  let mockData = {
    "url": "http://google.com",
  }

  return (
    <>
      <Layout title="Scan to checkout">
        <Flex
          direction="column"
          justify="center"
          align="center"
          gap={30}
          mb={100}
        >
          <Text>
            To begin checkout, open the camera on your mobile device and scan the QR code below.
          </Text>
          <Container>
            <QRCode value={mockData.url} size={250} />
          </Container>
        </Flex>
      </Layout >
    </>
  );
}
