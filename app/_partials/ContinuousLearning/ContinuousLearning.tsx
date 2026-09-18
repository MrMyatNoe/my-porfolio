import { Box, Heading, Text, Wrap, WrapItem } from '@chakra-ui/react'

const PLACEHOLDER_CREDENTIALS = ['[Certification name] — [Issuer], [Year]', '[Course name] — [Platform], [Year]']

export function ContinuousLearning() {
  return (
    <Box as="section" id="learning" px={[5, 8, 16]} py={[10, 10, 14]} bg="bg.surface" borderY="1px solid" borderColor="border.default">
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Continuous learning
      </Heading>
      <Text fontSize="14px" color="text.secondary" mt={1}>
        Placeholder — replace with real certifications and courses.
      </Text>
      <Wrap spacing={3} mt={6} maxW="900px">
        {PLACEHOLDER_CREDENTIALS.map((entry) => (
          <WrapItem
            key={entry}
            border="1px solid"
            borderColor="border.default"
            borderRadius="10px"
            bg="bg.surfaceRaised"
            px={5}
            py={3.5}
            fontSize="13px"
            color="text.secondary"
          >
            {entry}
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  )
}
