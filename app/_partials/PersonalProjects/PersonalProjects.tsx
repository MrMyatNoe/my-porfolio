import { Box, Container, Flex, Heading, Tag, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'

const STACK = ['flutter', 'firebase', 'admob', 'next.js', 'chakra-ui']

export function PersonalProjects() {
  return (
    <Box as="section" id="projects" py={[10, 10, 14]}>
      <Container maxW="1080px" px={[5, 8, 16]} data-testid="content-container">
        <VStack align="stretch" spacing={1}>
          <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
            Personal projects
          </Heading>
          <Text fontSize="14px" color="text.secondary">
            What I build on my own initiative, outside of client work.
          </Text>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={8}
            border="1px solid"
            borderColor="border.default"
            borderRadius="12px"
            bg="bg.surfaceRaised"
            p={8}
            mt={6}
          >
            <VStack align="flex-start" spacing={3} flex={1}>
              <Text fontFamily="mono" fontSize="12px" color="text.secondary">
                Best IT Solutions · Independent · Dec 2021 – Present
              </Text>
              <Heading as="h3" fontFamily="heading" fontSize="20px">
                Astrology &amp; Maritime apps
              </Heading>
              <Text fontSize="13px" color="text.accent">
                Full-stack developer, product owner &amp; designer
              </Text>
              <Text fontSize="14px" lineHeight="1.6" color="text.secondary" maxW="520px">
                Sole developer on two consumer Flutter apps, each with a client and admin side, backed by Firebase and a
                Next.js + Chakra UI admin console. Monetized with AdMob.
              </Text>
              <Wrap spacing={2}>
                {STACK.map((item) => (
                  <WrapItem key={item}>
                    <Tag fontFamily="mono" fontSize="11px" color="text.secondary" bg="transparent" border="1px solid" borderColor="border.default" borderRadius="14px">
                      {item}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>
          </Flex>
        </VStack>
      </Container>
    </Box>
  )
}
