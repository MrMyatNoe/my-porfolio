import { Career } from '~/_partials/Career'
import { Introduction } from '~/_partials/Introduction'
import { Skill } from '~/_partials/Skill'
import { Header } from '~/components/Header'

import { Container } from '@chakra-ui/react'

export default function Index() {
  return (
    <Container maxW="7xl">
      <Header />
      <Introduction />
      <Skill />
      <Career />
    </Container>
  )
}
