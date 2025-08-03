import { Center, Container, Flex, Heading } from '@chakra-ui/react'

import { Backend } from './Backend'
import { Frontend } from './Frontend'
import { Mobile } from './Mobile'

export function Skill() {
  return (
    <Flex
      mt={['10', '12']}
      mb={['10', '12']}
      w="100%"
      px="6"
      py="5"
      direction="column"
    >
      <Center>
        <Heading>He Does</Heading>
      </Center>
      <Flex
        w="100%"
        align="center"
        gap="4"
        direction={['column', 'row']}
        mt={['5', '6']}
        mb={['5', '6']}
      >
        <Frontend />
        <Backend />
        <Mobile />
      </Flex>
    </Flex>
  )
}
