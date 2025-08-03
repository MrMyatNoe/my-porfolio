import Lottie from 'lottie-react'
import backend from 'public/jsons/backend.json'

import { Heading, Text, VStack } from '@chakra-ui/react'

import { style } from '../custom-css'

export function Backend() {
  return (
    <VStack align="center" w="100%">
      <Lottie animationData={backend} style={style} />
      <Heading fontSize="xl" fontWeight="black">
        Backend
      </Heading>
      <Heading fontSize="xl" fontWeight="black">
        Development
      </Heading>
      <Text fontSize="xl">Building and maintaining</Text>
      <Text fontSize="xl">backend APIs, ranging from</Text>
      <Text fontSize="xl">Public to Private</Text>
    </VStack>
  )
}
