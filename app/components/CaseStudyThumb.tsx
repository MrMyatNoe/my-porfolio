import { LuLock } from 'react-icons/lu'

import { Box, HStack, Text } from '@chakra-ui/react'

export function CaseStudyThumb({ nda }: { nda: boolean }) {
  return (
    <Box position="relative" w="100%" h="150px" bg="bg.surface" overflow="hidden">
      <Box as="svg" viewBox="0 0 260 100" w="92%" h="auto" mx="auto" mt={6} display="block">
        <rect x="4" y="34" width="66" height="30" rx="5" fill="var(--chakra-colors-bg-surfaceRaised)" stroke="var(--chakra-colors-border-default)" />
        <line x1="70" y1="49" x2="106" y2="49" stroke="var(--chakra-colors-text-accent)" strokeWidth="1.4" />
        <rect x="108" y="34" width="52" height="30" rx="5" fill="var(--chakra-colors-bg-surfaceRaised)" stroke="var(--chakra-colors-border-default)" />
        <line x1="160" y1="49" x2="196" y2="49" stroke="var(--chakra-colors-text-accent)" strokeWidth="1.4" />
        <rect x="198" y="34" width="58" height="30" rx="5" fill="var(--chakra-colors-bg-surfaceRaised)" stroke="var(--chakra-colors-border-default)" />
      </Box>
      {nda && (
        <HStack
          position="absolute"
          top={3}
          right={3}
          spacing={1.5}
          bg="bg.canvas"
          border="1px solid"
          borderColor="text.accentAmber"
          color="text.accentAmber"
          fontFamily="mono"
          fontSize="10px"
          px={2.5}
          py={1}
          borderRadius="full"
        >
          <LuLock size={11} />
          <Text>NDA Protected</Text>
        </HStack>
      )}
    </Box>
  )
}
