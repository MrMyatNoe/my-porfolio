import Lottie from 'lottie-react'
import mobile from 'public/jsons/mobile.json'

import { Heading, Text, VStack } from '@chakra-ui/react'

import { style } from '../custom-css'

export function Mobile() {
  return (
    <VStack align="center" w="100%">
      <Lottie animationData={mobile} style={style} />
      <Heading fontSize="xl" fontWeight="black">
        Mobile
      </Heading>
      <Heading fontSize="xl" fontWeight="black">
        Development
      </Heading>
      <Text fontSize="xl">Real-time mobile apps</Text>
      <Text fontSize="xl">delivering user experiences</Text>
      <Text fontSize="xl">using Flutter</Text>
    </VStack>
  )
}
