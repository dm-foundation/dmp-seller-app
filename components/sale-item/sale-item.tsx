import { Flex, Image } from '@mantine/core';

export default function SaleItem() {
    return (
        <Flex>
            <Image
                alt="Amplify logo"
                src="../public/amplify-logo.svg"
                height="75%"
                width="75%"
                opacity="100%"
                onClick={() => alert('📸 Say cheese!')}
            />
        </Flex>
    )
}