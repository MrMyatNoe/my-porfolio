import { Hero } from '~/_partials/Hero';
import { Skill } from '~/_partials/Skill';
import { TimeLine } from '~/_partials/Timeline';
import { Footer } from '~/components/Footer';

import { Container, Divider } from '@chakra-ui/react';

export default function Index() {
  return (
    <Container maxW="80%" alignContent="center">
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
      <Footer />
    </Container>
  )
}
