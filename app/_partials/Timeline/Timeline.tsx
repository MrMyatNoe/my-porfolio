import { Card } from '~/components/Card'
import { milestones } from '~/data/career'

import { Box, Heading, VStack } from '@chakra-ui/react'

export function Timeline() {
  return (
    <Box as="section" id="experience" px={[5, 8, 16]} py={[10, 10, 14]}>
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Professional experience
      </Heading>
      <VStack align="stretch" spacing={0} maxW="760px" mt={9}>
        {milestones.map((milestone, index) => {
          const isLast = index === milestones.length - 1
          return (
            <Box key={milestone.id} display="flex" gap={[4, 6]} pb={isLast ? 0 : 6}>
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
                />
              </Box>
              <Card {...milestone} />
            </Box>
          )
        })}
      </VStack>
    </Box>
  )
}
