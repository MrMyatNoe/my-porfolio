import { Box, HStack, Tag, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'

interface CardProps {
  hash: string
  current?: boolean
  company: string
  role: string
  date: string
  bullets: string[]
  badges: string[]
}

const Card = ({ hash, current, company, role, date, bullets, badges }: CardProps) => {
  return (
    <VStack align="stretch" spacing={2} flex={1} data-testid="timeline-entry">
      <Text fontFamily="mono" fontSize="12px" color="text.accent">
        #{hash}
        {current ? ' · current' : ''}
      </Text>
      <HStack spacing={3} flexWrap="wrap" align="baseline">
        <Text fontFamily="heading" fontWeight="600" fontSize="17px">
          {company}
        </Text>
        <Text fontFamily="mono" fontSize="12px" color="text.secondary">
          {date}
        </Text>
      </HStack>
      <Text fontSize="14px" color="text.secondary">
        {role}
      </Text>
      <VStack as="ul" align="stretch" spacing={1.5} mt={1} sx={{ listStyle: 'none' }}>
        {bullets.map((bullet) => (
          <Box
            as="li"
            key={bullet}
            fontSize="13.5px"
            color="text.primary"
            pl={4}
            position="relative"
            lineHeight="1.5"
            _before={{ content: '"+"', position: 'absolute', left: 0, color: 'text.accent', fontFamily: 'mono' }}
          >
            {bullet}
          </Box>
        ))}
      </VStack>
      <Wrap spacing={2} mt={1}>
        {badges.map((badge) => (
          <WrapItem key={badge}>
            <Tag fontFamily="mono" fontSize="11px" color="text.secondary" bg="bg.surfaceRaised" border="none" borderRadius="full" px={3} py={1}>
              {badge}
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  )
}

export { Card }
