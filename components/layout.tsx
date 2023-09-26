import { Container, Divider, Flex, Title } from '@mantine/core'
import Navbar from './navbar'
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import Login from '../pages/login';
import classes from '@/pages/App.module.css';

export default function Layout({ title, children }: any) {
    const { isConnected } = useAccount()
    const [isUserConnected, setIsUserConnected] = useState(false)

    useEffect(() => {
        if (isConnected)
            setIsUserConnected(true)
    }, [])

    return (
        <>
            {isUserConnected ?
                <>
                    < Title className={classes.title_layout} ta='center' p={10} bg="#000" >
                        {title}
                    </Title >
                    <Divider orientation="horizontal" w={"100%"} mb="xl" />
                    <Container w={"98%"}>
                        <Flex
                            gap="xs"
                            justify="flex-start"
                            align="flex-start"
                            direction="column"
                            wrap="nowrap"
                        >
                            <main style={{ width: '100%' }}>{children}</main>
                        </Flex>
                    </Container>
                    <Navbar />
                </>
                : <Login />
            }
        </>
    );
}
