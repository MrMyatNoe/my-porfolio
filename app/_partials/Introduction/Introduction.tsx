import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import { BsGithub, BsLinkedin, BsMessenger, BsTwitter } from 'react-icons/bs'

export function Introduction() {
  return (
    <Container maxW="7xl">
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
            <Text fontSize="2xl" color="blue" fontWeight="bold">
              Bangkok
            </Text>
          </Flex>
          <Flex align="left" gap="4" direction="row">
            <Link
              href="https://www.linkedin.com/in/thet-myat-noe-14682b142/"
              isExternal
            >
              <BsLinkedin size="20" />
            </Link>
            <Link href="https://twitter.com/ThetMyatNoe13" isExternal>
              <BsTwitter size="20" />
            </Link>
            <Link href="https://github.com/MrMyatNoe" isExternal>
              <BsGithub size="20" />
            </Link>
            <Link
              href="https://www.facebook.com/messages/t/100004598350152"
              isExternal
            >
              <BsMessenger size="20" />
            </Link>
          </Flex>
        </Box>
        <Box w={['100%', '50%']}>
          <Flex w={['100%', '50%']} align="center">
            <Image
              borderRadius="full"
              boxSize={['220px', '150px']}
              src="https://media-exp2.licdn.com/dms/image/C5603AQFKeyW6nGTDBg/profile-displayphoto-shrink_800_800/0/1611579914968?e=1662595200&v=beta&t=DQ8h2eha5i1n7d3mY67Bw4A3ESAZPVked2jR9ygKSnA"
              alt="Thet Myat Noe"
            />
          </Flex>
        </Box>
      </Flex>
    </Container>
  )
}
