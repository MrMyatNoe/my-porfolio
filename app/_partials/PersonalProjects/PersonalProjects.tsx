import { Box, Container, Flex, Heading, Tag, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'

interface PersonalProject {
  meta: string
  title: string
  role: string
  description: string
  stack: string[]
}

const PROJECTS: PersonalProject[] = [
  {
    meta: 'Best IT Solutions · Independent · Dec 2021 – Present',
    title: 'Astrology & Maritime apps',
    role: 'Full-stack developer, product owner & designer',
    description:
      'Sole developer on two consumer Flutter apps, each with a client and admin side, backed by Firebase and a Next.js + Chakra UI admin console. Monetized with AdMob.',
    stack: ['flutter', 'firebase', 'admob', 'next.js', 'chakra-ui'],
  },
  {
    meta: 'Best IT Solutions · Independent · Dec 2021 – Present',
    title: 'High Volume Analyzer',
    role: 'Full-stack developer, product owner & designer',
    description: 'Ticket systems including Core Engine, Realtime Gateway, and Smart Bank.',
    stack: ['java', 'spring-boot', 'next.js', 'typescript', 'nestjs', 'golang', 'rest-api', 'kafka', 'redis', 'mongodb'],
  },
]

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
          <VStack align="stretch" spacing={6} mt={6}>
            {PROJECTS.map((project) => (
              <Flex
                key={project.title}
                direction={{ base: 'column', md: 'row' }}
                gap={8}
                border="1px solid"
                borderColor="border.default"
                borderRadius="12px"
                bg="bg.surfaceRaised"
                p={8}
              >
                <VStack align="flex-start" spacing={3} flex={1}>
                  <Text fontFamily="mono" fontSize="12px" color="text.secondary">
                    {project.meta}
                  </Text>
                  <Heading as="h3" fontFamily="heading" fontSize="20px">
                    {project.title}
                  </Heading>
                  <Text fontSize="13px" color="text.accent">
                    {project.role}
                  </Text>
                  <Text fontSize="14px" lineHeight="1.6" color="text.secondary" maxW="520px">
                    {project.description}
                  </Text>
                  <Wrap spacing={2}>
                    {project.stack.map((item) => (
                      <WrapItem key={item}>
                        <Tag fontFamily="mono" fontSize="11px" color="text.secondary" bg="transparent" border="1px solid" borderColor="border.default" borderRadius="14px">
                          {item}
                        </Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                </VStack>
              </Flex>
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}
