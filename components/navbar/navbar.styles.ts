import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  navbar: {
    overflow: 'hidden',
    backgroundColor: '#eee',
    color: "#fff",
    width: '100%',
    height: '12%',
    position: 'fixed',
    bottom: '0px',
    zIndex: 1000,
  },
  navbar_links: {
    fontSize: '13px',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignContent: 'space-evenly',
    justifyItems: 'space-between',
  },
  link: {
    textDecoration: 'none',
    textDecorationColor: '#fff',
    color: '#888',
    textAlign: "center",
  }
}));
