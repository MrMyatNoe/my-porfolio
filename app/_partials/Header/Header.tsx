import {  Container, Flex, Stack, Text } from "@chakra-ui/react";

export function Header(){
    return (
        <Container maxW='7xl'>
            <Flex
            as="nav"
            w="100%"
            px="6"
            py="5"
            align="center"
            justify="space-around"
            bg='red'
          >
            <Stack spacing={8}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
            >
                <Text display="block">HOME</Text>
                <Text display="block">ABOUT</Text>
                <Text display="block">RESUME</Text>
                <Text display="block">WORKS</Text>
                <Text display="block">TESTIMONIALS</Text>
                <Text display="block">CONTRACT</Text>
            </Stack>
            
        </Flex>
        
        </Container>
    )
}