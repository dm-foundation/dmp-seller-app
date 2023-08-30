import { Title, Text, Button, Flex } from '@mantine/core';
import useStyles from './index.styles';
export default function Login() {
  const { classes } = useStyles();

  return (
    <>
      <Flex className={classes.loginbox}
        mih={50}
        gap="sm"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Title className={classes.title} size="xl" mb="sm" mt="xl">
          Mass Market
        </Title>
        <Text color="dimmed" size="md" sx={{ maxWidth: 580 }} mx="auto" mb="lg">
          Sign in with an Ethereum address to set up your store
        </Text>
        <Button className={classes.loginbutton}>Sign in</Button>
      </Flex >
    </>
  );
}
