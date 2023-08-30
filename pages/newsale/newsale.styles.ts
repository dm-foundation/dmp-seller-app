import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: -1,
  },
  loginbox: {
    marginBottom: 40,
    fontSize: 30,

  },
  loginbutton: {
    fontSize: 16,
  }
}));
