import { Divider, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export const FPT = () => {
  return (
    <VStack spacing={1} mt={4} mb={4}>
      <VStack spacing="none">
        <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
          FPT Software Myanmar(March 2017 - Aug 2017)
        </Heading>
        <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
          Java Developer
        </Heading>
      </VStack>

      <VStack mt={2} spacing={1} mb={['4', '8']}>
        <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
          Maintenance the framework
        </Heading>
        <Text fontSize="lg">Add new feature</Text>
        <Text fontSize="lg">in framework for maintenance</Text>
        <Text fontSize="lg">using Java, J2EE</Text>
        <Text fontSize="lg">Java/ J2EE / OracleDB</Text>
      </VStack>
      <Divider fontWeight="bold" />
    </VStack>
  )
}
