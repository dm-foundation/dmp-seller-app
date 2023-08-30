import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 42,
    fontWeight: 900,
    letterSpacing: -2,
  },
  loginbox: {
    marginBottom: 40,
    fontSize: 30,

  },
  loginbutton: {
    fontSize: 16,
  }
}));
