import { Group, Flex } from '@mantine/core';
import { IconMenuOrder, IconShoppingCart, IconTransform } from '@tabler/icons-react';
import Link from 'next/link';
import classes from '@/pages/App.module.css';

const mockData = [
    { link: '/newsale', label: 'New Sale', icon: IconShoppingCart },
    { link: '/transactions', label: 'Transactions', icon: IconTransform },
    { link: '/more', label: 'More', icon: IconMenuOrder },
];

export default function SellerNavbar() {

    const links = mockData.map((item) => (
        <Link key={item.label} href={item.link} className={classes.navbar_link}>
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
            <Group gap={'xl'} className={classes.navbar_links}>
                {links}
            </Group>
        </Flex >
    );
}