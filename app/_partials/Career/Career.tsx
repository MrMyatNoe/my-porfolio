import { Container, Flex, Heading } from '@chakra-ui/react'
import { Allianz } from './Allianz'
import { Best } from './Best'
import { FPT } from './FPT'
import { MBC } from './MBC'
import { Nanyan } from './Nanyan'

export const Career = () => {
  return (
    <Container maxW="7xl">
      <Flex align="center" direction="column">
        <Heading>Career</Heading>
        <FPT />
        <MBC />
        <Nanyan />
        <Best />
        <Allianz />
      </Flex>
    </Container>
  )
}
