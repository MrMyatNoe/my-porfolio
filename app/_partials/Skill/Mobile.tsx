import { Heading, Text, VStack } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import mobile from 'public/jsons/mobile.json'
import { style } from '../custom-css'

export function Mobile() {
  return (
    <VStack align="center" w="100%">
      <Lottie animationData={mobile} style={style} />
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
