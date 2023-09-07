import { Text, Flex, createStyles, Container, Image } from '@mantine/core';
import Layout from '../../../components/layout';
import QRCode from "react-qr-code";
import { useAccount, useDisconnect } from "wagmi";

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
  const { address, isConnected } = useAccount();

  let mockData = {
    "qrcode_url": `ethereum:${address}?value=500000000000000`,
    "qrcode_image_file": "1GaklZFWyP.png"
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
            <QRCode value={mockData.qrcode_url} size={400} />
          </Container>
        </Flex>
      </Layout >
    </>
  );
}
