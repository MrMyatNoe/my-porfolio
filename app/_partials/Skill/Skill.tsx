import { Center, Container, Flex, Heading } from '@chakra-ui/react'
import { Frontend } from './Frontend'
import { Backend } from './Backend'
import { Mobile } from './Mobile'

export function Skill() {
  return (
    <Container maxW="7xl" bg="pink.200" mt={4} mb={4}>
      <Center>
        <Heading>He Does</Heading>
      </Center>
      <Flex w="100%" align="center" gap="4" direction={['column', 'row']}>
        <Frontend />
        <Backend />
        <Mobile />
      </Flex>
    </Container>
  )
}
