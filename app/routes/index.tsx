import { Career } from '~/_partials/Career'
import { Hero } from '~/_partials/Hero'
import { Skill } from '~/_partials/Skill'
import { Header } from '~/components/Header'

import { Container, Divider, Flex, Heading } from '@chakra-ui/react'
import { Freelance } from '~/_partials/Freelance'
import { Persona } from '~/_partials/Persona/Persona'

export default function Index() {
  return (
    <Container maxW="100%">
      <Header />
      <Hero />
      <Divider fontWeight="bold" color="gray.700" />
      <Skill />
      <Divider fontWeight="bold" color="gray.700" />
      <Career />
      <Divider fontWeight="bold" color="gray.700" />
      <Freelance />
      <Divider fontWeight="bold" color="gray.700"/>
      <Persona />
      <Divider fontWeight="bold" color="gray.700"/>
      <Flex align="center" direction="column">
        <Heading fontSize={['20px', '25px']} size="lg" letterSpacing="2px" mt={['10', '12']} mb={['10', '12']}>
          Footer
        </Heading>
      </Flex>
    </Container>
  )
}
