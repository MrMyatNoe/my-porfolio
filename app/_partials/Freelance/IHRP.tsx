import { Divider, Heading, Text, VStack } from '@chakra-ui/react'

export const IHRP = () => {
  return (
    <>
      <VStack spacing={1} mt={['4', '8']} mb={['4', '8']}>
        <VStack spacing="none">
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            IHRP (Dec 2021 - Jan 2022)
          </Heading>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Frontend Developer
          </Heading>
        </VStack>
        <VStack mt={2} spacing={1} mb={['4', '8']}>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Redesign Blog App
          </Heading>
          <Text fontSize="lg">add two pages reading the component documentation</Text>
          <Text fontSize="lg">
            GraphQL / Next.js / Chakra UI/ Typescript 
          </Text>
        </VStack>
        <Divider fontWeight="bold" />
      </VStack>
    </>
  )
}
