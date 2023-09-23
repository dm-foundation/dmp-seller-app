import Layout from "@/components/layout";
import { Flex, Text } from "@mantine/core";
import classes from '@/pages/App.module.css';

export default function Custom404() {

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