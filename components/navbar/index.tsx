import { Group, Flex } from '@mantine/core';
import { IconMenuOrder, IconShoppingCart, IconTransform } from '@tabler/icons-react';
import useStyles from './navbar.styles';
import Link from 'next/link';

const mockData = [
    { link: '/newsale', label: 'Checkout', icon: IconShoppingCart },
    { link: '/transactions', label: 'Transactions', icon: IconTransform },
    { link: '/more', label: 'More', icon: IconMenuOrder },
];

export default function SellerNavbar() {
    const { classes } = useStyles();

    const links = mockData.map((item) => (
        <Link key={item.label} href={item.link} className={classes.link}>
            <item.icon /><br />
            <span>{item.label}</span>
        </Link >
    ));

    return (
        <Flex
            justify="space-evenly"
            direction={'row'}
            bg={'#eee'}
            className={classes.navbar}
        >
            <Group spacing="xl" className={classes.navbar_links}>
                {links}
            </Group>
        </Flex>
    );
}