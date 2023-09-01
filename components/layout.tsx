import { Container, Divider, Flex, Title, createStyles } from '@mantine/core'
import Navbar from './navbar'

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 28,
        textTransform: 'uppercase',
        fontWeight: 800,
        letterSpacing: - 1,
    }
}));


export default function Layout({ title, children }: any) {
    const { classes } = useStyles();

    return (
        <>
            <Title className={classes.title} size="sm" align='center' mb="md" mt="md" ml={'md'}>
                {title}
            </Title>
            <Divider orientation="horizontal" w={"100%"} mb="xl" mt="md" />
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
    )
}