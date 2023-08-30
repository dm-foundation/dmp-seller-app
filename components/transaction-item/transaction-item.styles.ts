import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  stock: {
    color: theme.colors.orange[5],
    fontSize: theme.fontSizes.sm,
  },
  itemTitle: {
    fontSize: theme.fontSizes.lg,

  }
}));