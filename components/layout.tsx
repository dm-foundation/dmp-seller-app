import { Container, Divider, Flex, Title, createStyles } from '@mantine/core'
import Navbar from './navbar'
import { useAccount } from 'wagmi';
import { useState, useEffect, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react';
import Login from '../pages/login';

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 28,
        textTransform: 'uppercase',
        color: '#fff',
        fontWeight: 800,
        letterSpacing: - 1,
    }
}));


export default function Layout({ title, children }: any) {
    const { classes } = useStyles();
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
                    < Title className={classes.title} ta='center' p={10} bg="#000" >
                        {title}
                    </Title >
                    <Divider orientation="horizontal" w={"100%"} mb="xl" />
                    <Container w={"98%"}>
                        <Flex
                            gap="xs"
                            justify="center"
                            align="center"
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
