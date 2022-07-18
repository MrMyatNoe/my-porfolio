import { Divider, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export const FPT = () => {
  return (
    <VStack spacing={1} mt={4}>
      <VStack spacing="none">
        <Heading fontSize="xl" fontWeight="black">
          FPT Software Myanmar(March 2017 - Aug 2017)
        </Heading>
        <Heading fontSize="xl" fontWeight="black">
          Java Developer
        </Heading>
      </VStack>

      <VStack mt={2} spacing={1}>
        <Heading fontSize="xl" fontWeight="black">
          Maintenance the framework
        </Heading>
        <Text fontSize="xl">Add new feature</Text>
        <Text fontSize="xl">in framework for maintenance</Text>
        <Text fontSize="xl">using Java, J2EE</Text>
        <Text fontSize="xl">Java/ J2EE / OracleDB</Text>
      </VStack>
      <Divider fontWeight="bold" />
    </VStack>
  )
}
