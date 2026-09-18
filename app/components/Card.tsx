import type { IconType } from 'react-icons'

import { Badge, Box, HStack, Icon, Text, VStack } from '@chakra-ui/react'

interface CardProps {
  id: number
  categories: string[]
  title: string
  icon: IconType
  description: string
  date: string
}

const Card = ({ categories, title, icon, description, date }: CardProps) => {
  return (
    <HStack
      flex={1}
      p={[4, 6]}
      bg="bg.surfaceRaised"
      spacing={5}
      rounded="lg"
      pos="relative"
      _before={{
        content: `""`,
        position: 'absolute',
        left: '-15px',
        top: 0,
        w: 0,
        h: 0,
        borderStyle: 'solid',
        borderWidth: '15px 15px 15px 0',
        borderColor: 'transparent var(--chakra-colors-bg-surfaceRaised) transparent transparent',
      }}
    >
      <Icon as={icon} w={[10, 12]} h={[10, 12]} color="text.accent" />
      <Box>
        <VStack mb={3} textAlign="left" alignItems="flex-start">
          <Text _hover={{ color: 'text.accent' }} fontSize="md" lineHeight={1.2} fontWeight="bold" w="100%">
            {title}
          </Text>
          <Text fontSize="sm" color="text.accent">
            {date}
          </Text>
          <Text fontSize="md" color="text.secondary">
            {description}
          </Text>
          <HStack spacing={2} mb={1} flexWrap="wrap">
            {categories.map((cat) => (
              <Badge variant="outline" colorScheme="green" key={cat}>
                {cat}
              </Badge>
            ))}
          </HStack>
        </VStack>
      </Box>
    </HStack>
  )
}

export { Card }
