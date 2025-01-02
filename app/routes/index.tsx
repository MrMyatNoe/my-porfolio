import { Career } from '~/_partials/Career'
import { Hero } from '~/_partials/Hero'
import { Skill } from '~/_partials/Skill'
import { Header } from '~/components/Header'

import { Container } from '@chakra-ui/react'

export default function Index() {
  return (
    <Container maxW="100%">
      <Header />
      <Hero />
      <Skill />
      <Career />
    </Container>
  )
}
