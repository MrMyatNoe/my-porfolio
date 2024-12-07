import { Heading, Text, VStack } from '@chakra-ui/react'

export function Frontend() {
  return (
    <VStack align="center" w="100%">
      {/* <Lottie animationData={frontend} style={style} /> */}
      <Heading fontSize="xl" fontWeight="black">
        Frontend
      </Heading>
      <Heading fontSize="xl" fontWeight="black">
        Development
      </Heading>
      <Text fontSize="xl">Create Dynamic Apps</Text>
      <Text fontSize="xl">From your mobile</Text>
      <Text fontSize="xl">To a Big Screen</Text>
    </VStack>
  )
}
