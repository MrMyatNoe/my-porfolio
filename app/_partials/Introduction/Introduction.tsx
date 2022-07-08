import { Box, Container, Flex, Heading, Image, Text } from '@chakra-ui/react'

export function Introduction() {
  return (
    <Container maxW="7xl" bg="yellow.200">
      <Flex
        w="100%"
        px="6"
        py="5"
        align="center"
        gap="4"
        direction={['column', 'row']}
      >
        <Box w={['100%', '50%']}>
          <Heading fontSize="40px" size="lg" letterSpacing="2px">
            This is
          </Heading>
          <Flex
            w={['100%', '100%']}
            align="left"
            gap="4"
            direction={['column', 'row']}
          >
            <Heading fontSize="40px" size="lg" letterSpacing="2px">
              Thet Myat Noe
            </Heading>
          </Flex>
          <Flex
            w={['100%', '100%']}
            align="left"
            gap="4"
            direction={['column', 'row']}
          >
            <Text fontSize="xl">Advanced Backend Developer in</Text>
          </Flex>
          <Flex
            w={['100%', '100%']}
            align="left"
            gap="4"
            direction={['column', 'row']}
          >
            <Text fontSize="xl">Bangkok</Text>
          </Flex>
        </Box>
        <Box w={['100%', '50%']}>
          <Flex w={['100%', '50%']} align="center">
            <Image
              borderRadius="full"
              boxSize={['220px', '150px']}
              src="https://media-exp2.licdn.com/dms/image/C5603AQFKeyW6nGTDBg/profile-displayphoto-shrink_800_800/0/1611579914968?e=1662595200&v=beta&t=DQ8h2eha5i1n7d3mY67Bw4A3ESAZPVked2jR9ygKSnA"
              alt="Thet Myat Npe"
            />
          </Flex>
        </Box>
      </Flex>
    </Container>
  )
}
