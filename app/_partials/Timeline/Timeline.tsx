import { Card } from '~/components/Card'
import { Reveal } from '~/components/Reveal'
import { milestones } from '~/data/career'

import { Box, Heading, VStack } from '@chakra-ui/react'

export function Timeline() {
  return (
    <Box as="section" id="experience" py={[10, 10, 14]}>
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Professional experience
      </Heading>
      <VStack data-testid="experience-timeline" align="stretch" spacing={0} maxW="760px" mt={9} mx="auto">
        {milestones.map((milestone, index) => {
          const isLast = index === milestones.length - 1
          return (
            <Reveal key={milestone.id} delay={index * 0.05}>
              <Box display="flex" gap={[4, 6]} pb={isLast ? 0 : 6}>
                <Box w={[5, 6]} flexShrink={0} position="relative">
                  {!isLast && (
                    <Box position="absolute" left="50%" top={0} bottom="-24px" w="1px" bg="border.default" />
                  )}
                  <Box
                    position="relative"
                    w={['10px', '12px']}
                    h={['10px', '12px']}
                    borderRadius="full"
                    bg="text.accent"
                    border="2px solid"
                    borderColor="bg.canvas"
                    mx="auto"
                    mt={1}
                    boxShadow="0 0 10px var(--chakra-colors-text-accent)"
                  />
                </Box>
                <Card {...milestone} />
              </Box>
            </Reveal>
          )
        })}
      </VStack>
    </Box>
  )
}
