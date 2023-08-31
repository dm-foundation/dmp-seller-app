import { Title, Text, Button, Flex, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 62,
    fontWeight: 900,
    letterSpacing: -2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  loginbox: {
    marginBottom: 40,
    margin: 30,
    fontSize: 30,

  },
  loginbutton: {
    fontSize: 16,
  }
}));


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
      >
        <Title className={classes.title} size="xl" mb="sm" mt="md">
          Mass Market
        </Title>
        <Text className={classes.subtitle} color="dimmed" size="md" sx={{ maxWidth: 580 }} mx="auto" mb="lg">
          Sign in with an Ethereum address to set up your store
        </Text>
        <Button className={classes.loginbutton}>Sign in</Button>
      </Flex >
    </>
  );
}
