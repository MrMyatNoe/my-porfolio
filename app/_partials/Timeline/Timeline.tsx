import { Card } from '~/components/Card';
import { EmptyCard } from '~/components/EmptyCard';
import { LineWithDot } from '~/components/LineWithDot';
import { milestones } from '~/data/career';

import { Box, Center, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';

export function TimeLine() {
  const isDesktop = useBreakpointValue({ base: false, md: true })
  const isMobile = useBreakpointValue({ base: true, md: false })
  return (
    <>
      <Center>
        <Heading fontSize={['30px', '40px']} size="lg" letterSpacing="2px">
          Experience
        </Heading>
      </Center>
      <Box p={{ base: 2, sm: 10 }}>
        {milestones.map((milestone) => (
          <Flex key={milestone.id} mb="10px">
            {/* Desktop view(left card) */}
            {isDesktop && milestone.id % 2 === 0 && (
              <>
                <EmptyCard />
                <LineWithDot />
                <Card {...milestone} />
              </>
            )}
            {/* Mobile view */}
            {isMobile && (
              <>
                <LineWithDot />
                <Card {...milestone} />
              </>
            )}
            {/* Desktop view(right card) */}
            {isDesktop && milestone.id % 2 !== 0 && (
              <>
                <Card {...milestone} />
                <LineWithDot />
                <EmptyCard />
              </>
            )}
          </Flex>
        ))}
      </Box>
    </>
  )
}
