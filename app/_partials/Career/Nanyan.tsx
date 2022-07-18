import { Divider, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export const Nanyan = () => {
  return (
    <>
      <VStack spacing={1} mt={4}>
        <VStack spacing="none">
          <Heading fontSize="xl" fontWeight="black">
            Nanyan (Oct 2020 - Feb 2021)
          </Heading>
          <Heading fontSize="xl" fontWeight="black">
            Backend API Developer
          </Heading>
        </VStack>
        <VStack mt={2} spacing={1}>
          <Heading fontSize="xl" fontWeight="black">
            Ecommerce App
          </Heading>
          <Text fontSize="xl">using Java, Spring Boot Framework</Text>
          <Text fontSize="xl">
            GraphQL / Java8 / Spring Boot Framework / MySQL
          </Text>
        </VStack>
      </VStack>

      <VStack spacing={1} mt={4}>
        <VStack spacing="none">
          <Heading fontSize="xl" fontWeight="black">
            Nanyan (June 2021 - Apr 2022)
          </Heading>
          <Heading fontSize="xl" fontWeight="black">
            Full Stack Developer
          </Heading>
        </VStack>
        <VStack mt={2} spacing={1}>
          <Text fontSize="xl">Ecommerce App</Text>
          <Text fontSize="xl">using Nest.js, Remix.run</Text>
          <Text fontSize="xl">GraphQL / Nest.js / Remix.run / MongoDB</Text>
        </VStack>
        <Divider fontWeight="bold" />
      </VStack>
    </>
  )
}
