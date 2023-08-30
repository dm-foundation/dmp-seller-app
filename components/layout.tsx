import { Flex } from '@mantine/core'
import Navbar from './navbar'

export default function Layout({ children }: any) {
    return (
        <>
            <Flex
                gap="sm"
                justify="center"
                align="center"
                direction="column"
                wrap="nowrap"
            >
                <main>{children}</main>
                <Navbar />
            </Flex>
        </>
    )
}