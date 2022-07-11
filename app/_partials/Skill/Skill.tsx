import {
  Center,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import Lottie from 'lottie-react'
import frontend from 'public/jsons/frontend.json'
import backend from 'public/jsons/backend.json'
import mobile from 'public/jsons/mobile.json'

export function Skill() {
  const style = {
    height: 300,
  }
  return (
    <Container maxW="7xl" bg="pink.200" mt={4} mb={4}>
      <Center>
        <Heading>He Does</Heading>
      </Center>
      <Flex w="100%" align="center" gap="4" direction={['column', 'row']}>
        <VStack align="center" w="100%">
          <Lottie animationData={frontend} style={style} />
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
        <VStack align="center" w="100%">
          <Lottie animationData={backend} style={style} />
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
      </Flex>
    </Container>
  )
}
