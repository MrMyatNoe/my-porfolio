import { IconType } from 'react-icons'

import {
  Badge,
  Box,
  HStack,
  Icon,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'

interface CardProps {
  id: number
  categories: string[]
  title: string
  icon: IconType
  description: string
  date: string
}

const Card = ({
  id,
  categories,
  title,
  icon,
  description,
  date,
}: CardProps) => {
  // For even id show card on left side
  // For odd id show card on right side
  const isEvenId = id % 2 == 0
  let borderWidthValue = isEvenId ? '15px 15px 15px 0' : '15px 0 15px 15px'
  let leftValue = isEvenId ? '-15px' : 'unset'
  let rightValue = isEvenId ? 'unset' : '-15px'
  const isDesktop = useBreakpointValue({ base: false, md: true })
  const isMobile = useBreakpointValue({ base: true, md: false })
  let iconSize = isMobile ? 10 : 12
  if (isMobile) {
    leftValue = '-15px'
    rightValue = 'unset'
    borderWidthValue = '15px 15px 15px 0'
  }
  return (
    <HStack
      flex={1}
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue('gray.100', 'gray.800')}
      spacing={5}
      rounded="lg"
      pos="relative"
      _before={{
        content: `""`,
        w: '0',
        h: '0',
        borderColor: `transparent ${useColorModeValue(
          '#edf2f6',
          '#1a202c',
        )} transparent`,
        borderStyle: 'solid',
        borderWidth: borderWidthValue,
        position: 'absolute',
        left: leftValue,
        right: rightValue,
        display: 'block',
      }}
    >
      <Icon as={icon} w={iconSize} h={iconSize} color="teal.400" />
      <Box>
        <VStack mb={3} textAlign="left" alignItems="flex-start">
          <Text
            _hover={{ color: 'teal.400' }}
            fontSize="md"
            lineHeight={1.2}
            fontWeight="bold"
            w="100%"
          >
            {title}
          </Text>
          <Text fontSize="sm" color='teal.400'>
            {date}
          </Text>
          <Text fontSize="md">
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
