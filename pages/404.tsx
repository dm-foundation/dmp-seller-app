import Layout from "@/components/layout";
import { Flex, Text, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 220,
        fontWeight: 900,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 60,
        fontWeight: 900,
        fontVariantCaps: "all-small-caps",
        letterSpacing: -2,
    }
}));


export default function Custom404() {
    const { classes } = useStyles();

    return (
        <Layout title="Page not found">
            <Flex
                direction="column"
                justify="center"
                align="center"
            >
                <Text className={classes.title}>404</Text>
                <Text className={classes.subtitle}>Page Not Found</Text>
            </Flex>
        </Layout >
    )
}