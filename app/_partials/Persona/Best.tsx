import { Heading, Text, VStack } from '@chakra-ui/react'

export const Best = () => {
  return (
    <>
      <VStack spacing={1} mt={['4', '8']} mb={['4', '8']}>
        <VStack spacing="none">
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Best IT Solutions (Dec 2021 - Present)
          </Heading>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Full Developer
          </Heading>
        </VStack>
        <VStack mt={2} spacing={1}>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Astrology App
          </Heading>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            MMaritime App
          </Heading>
          <Text fontSize="lg">using Dart, Flutter, Firebase, Admob</Text>
          <Text fontSize="lg">Next.js / Chakra UI / Firebase / Admob</Text>
          <Text fontSize="lg">Both Apps are using client side and admin side</Text>
        </VStack>
      </VStack>
    </>
  )
}
