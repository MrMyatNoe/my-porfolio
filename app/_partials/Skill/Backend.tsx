import { Heading, Text, VStack } from '@chakra-ui/react'

export function Backend() {
  return (
    <VStack align="center" w="100%">
      {/* <Lottie animationData={backend} style={style} /> */}
      <Heading fontSize="xl" fontWeight="black">
        Frontend
      </Heading>
      <Heading fontSize="xl" fontWeight="black">
        Development
      </Heading>
      <Text fontSize="xl">Delivers secure and scalable</Text>
      <Text fontSize="xl">backend APIs, ranging from</Text>
      <Text fontSize="xl">Public to Private</Text>
    </VStack>
  )
}
