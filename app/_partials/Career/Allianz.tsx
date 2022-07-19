import { Divider, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export const FPT = () => {
  return (
    <VStack spacing={1} mt={4}>
      <VStack spacing="none">
        <Heading fontSize="xl" fontWeight="black">
          Allianz Thailand(July 2012 - Current)
        </Heading>
        <Heading fontSize="xl" fontWeight="black">
          Advanced Backend Developer
        </Heading>
      </VStack>

      <VStack mt={2} spacing={1}>
        <Heading fontSize="xl" fontWeight="black">
          Specific in backend development
        </Heading>
        <Text fontSize="xl">Learning new features</Text>
        <Text fontSize="xl">& new Enviroments </Text>
        <Text fontSize="xl">& new Cultures</Text>
      </VStack>
      <Divider fontWeight="bold" />
    </VStack>
  )
}
