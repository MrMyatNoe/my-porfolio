import { Container, Flex, Stack, Text } from '@chakra-ui/react'

export function Header() {
  return (
    <Container maxW="7xl" bg="red">
      <Flex
        as="nav"
        w="100%"
        px="6"
        py="5"
        align="center"
        justify="space-around"
      >
        <Stack
          spacing={8}
          align="center"
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <Text display="block">HOME</Text>
          <Text display="block">ABOUT</Text>
          <Text display="block">RESUME</Text>
          <Text display="block">WORKS</Text>
          <Text display="block">TESTIMONIALS</Text>
          <Text display="block">CONTACT</Text>
        </Stack>
      </Flex>
    </Container>
  )
}
