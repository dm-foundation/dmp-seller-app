import { Group, Flex } from '@mantine/core';
import { IconMenuOrder, IconShoppingCart, IconTransform } from '@tabler/icons-react';
import useStyles from './navbar.styles';
import Link from 'next/link';

const data = [
    { link: '/newsale', label: 'Checkout', icon: IconShoppingCart },
    { link: '/transactions', label: 'Transactions', icon: IconTransform },
    { link: '/more', label: 'More', icon: IconMenuOrder },
];

export default function SellerNavbar() {
    const { classes } = useStyles();

    const links = data.map((item) => (
        <Link
            href={item.link}
            align="center">
            <item.icon /><br />
            <span>{item.label}</span>
        </Link >
    ));

    return (
        <Flex
            justify="space-evenly"
            direction={'row'}
            bg={'#eee'}
            style={{ width: '100%', height: '10%', position: 'fixed', bottom: '0px', zIndex: 1000 }}
        >
            <Group>
                {links}
            </Group>
        </Flex>
    );
}