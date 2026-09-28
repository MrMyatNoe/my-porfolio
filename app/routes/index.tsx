import { CaseStudies } from '~/_partials/CaseStudies'
import { ContinuousLearning } from '~/_partials/ContinuousLearning'
import { Hero } from '~/_partials/Hero'
import { PersonalProjects } from '~/_partials/PersonalProjects'
import { Skill } from '~/_partials/Skill'
import { Timeline } from '~/_partials/Timeline'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'

import { Box, Container } from '@chakra-ui/react'

export default function Index() {
  return (
    <>
      <Header />
      <Box as="main" id="main-content">
        <Container maxW="1080px" px={[5, 8, 16]} data-testid="content-container">
          <Hero />
          <Skill />
          <Timeline />
          <CaseStudies />
          <PersonalProjects />
          <ContinuousLearning />
        </Container>
      </Box>
      <Footer />
    </>
  )
}
