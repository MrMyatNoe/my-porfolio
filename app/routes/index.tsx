import { Career } from '~/_partials/Career'
import { Hero } from '~/_partials/Hero'
import { Skill } from '~/_partials/Skill'
import { Header } from '~/components/Header'

import { Container, Divider } from '@chakra-ui/react'

export default function Index() {
  return (
    <Container maxW="100%">
      <Header />
      <Hero />
      <Divider fontWeight="bold" color="gray.100" />
      <Skill />
      <Divider fontWeight="bold" color="gray.100" />
      <Career />
    </Container>
  )
}
