import { Flex } from '@mantine/core'
import Navbar from './navbar/index'

export default function Layout({ children }: any) {
    return (
        <>
            <Flex
                gap="xs"
                justify="center"
                align="center"
                direction="column"
                wrap="nowrap"
            >
                <main style={{ width: '100%' }}>{children}</main>
            </Flex>
            <Navbar />
        </>
    )
}