import { Hero } from '~/_partials/Hero'
import { Skill } from '~/_partials/Skill'
import { TimeLine } from '~/_partials/Timeline'

import { Container, Divider, Flex, Heading } from '@chakra-ui/react'

export default function Index() {
  return (
    <Container maxW="100%" alignContent="center">
      {/* <Header /> */}
      <Hero />
      <Divider fontWeight="bold" color="gray.700" />
      <Skill />
      <Divider fontWeight="bold" color="gray.700" />
      {/* <Career />
      <Divider fontWeight="bold" color="gray.700" />
      <Freelance />
      <Divider fontWeight="bold" color="gray.700" />
      <Persona />
      <Divider fontWeight="bold" color="gray.700" /> */}
      <TimeLine />
      <Divider fontWeight="bold" color="gray.700" />
      <Flex align="center" direction="column">
        <Heading
          fontSize={['20px', '25px']}
          size="lg"
          letterSpacing="2px"
          mt={['10', '12']}
          mb={['10', '12']}
        >
          Footer
        </Heading>
      </Flex>
    </Container>
  )
}
