import { Divider, Heading, Text, VStack } from '@chakra-ui/react'

export const Best = () => {
  return (
    <>
      <VStack spacing={1} mt={4}>
        <VStack spacing="none">
          <Heading fontSize="xl" fontWeight="black">
            Best IT Solutions (Dec 2021 - Present)
          </Heading>
          <Heading fontSize="xl" fontWeight="black">
            Mobile Developer
          </Heading>
        </VStack>
        <VStack mt={2} spacing={1}>
          <Heading fontSize="xl" fontWeight="black">
            Astrology App
          </Heading>
          <Heading fontSize="xl" fontWeight="black">
            MMaritime App
          </Heading>
          <Text fontSize="xl">using Dart, Flutter, Firebase, Admob</Text>
          <Text fontSize="xl">Dart / Flutter / Firebase / Admob</Text>
        </VStack>
        <Divider fontWeight="bold" />
      </VStack>
    </>
  )
}
