import { Center, Container, Flex, Heading } from '@chakra-ui/react'

import { Backend } from './Backend'
import { Frontend } from './Frontend'
import { Mobile } from './Mobile'

export function Skill() {
  return (
    <>
      <Center>
        <Heading>He Does</Heading>
      </Center>
      <Flex w="100%" align="center" gap="4" direction={['column', 'row']}>
        <Frontend />
        <Backend />
        <Mobile />
      </Flex>
    </>
  )
}
