import { Flex } from '@mantine/core'
import Navbar from './navbar'

export default function Layout({ children }) {
    return (
        <>
            <Flex
                mih={50}
                gap="sm"
                justify="center"
                align="center"
                direction="column"
                wrap="wrap"
            >
                <main>{children}</main>
                <Navbar />
            </Flex>
        </>
    )
}