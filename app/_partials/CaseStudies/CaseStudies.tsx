import { Box, Heading, SimpleGrid, Tag, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'

interface CaseStudy {
  meta: string
  title: string
  description: string
  stack: string[]
}

const CASE_STUDIES: CaseStudy[] = [
  {
    meta: 'Allianz Technology Thailand · 2022–Present',
    title: 'Underwriting platform microservices',
    description:
      'Took over backend ownership of the underwriting workbench, splitting a monolith into contract-tested microservices so underwriting and claims teams could ship independently.',
    stack: ['java17', 'spring-boot', 'kafka', 'playwright'],
  },
  {
    meta: 'Nan Yan Platform, Myanmar · 2020–2022',
    title: 'Multi-phase commerce platform',
    description:
      'Carried an e-commerce platform through four stack phases across backend, frontend, and full-stack work — from Spring Boot/Hibernate through NestJS/Prisma to a Remix + Chakra UI frontend.',
    stack: ['spring-boot', 'nestjs', 'prisma', 'remix'],
  },
]

export function CaseStudies() {
  return (
    <Box as="section" id="case-studies" px={[5, 8, 16]} py={[10, 10, 14]} bg="bg.surface" borderY="1px solid" borderColor="border.default">
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Architecture case studies
      </Heading>
      <Text fontSize="14px" color="text.secondary" mt={1}>
        Two systems I&apos;ve designed, built, and operate for employers.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={8}>
        {CASE_STUDIES.map((study) => (
          <VStack key={study.title} align="flex-start" spacing={4} border="1px solid" borderColor="border.default" borderRadius="12px" bg="bg.surfaceRaised" p={7}>
            <Text fontFamily="mono" fontSize="12px" color="text.secondary">
              {study.meta}
            </Text>
            <Heading as="h3" fontFamily="heading" fontSize="18px">
              {study.title}
            </Heading>
            <Text fontSize="14px" lineHeight="1.6" color="text.secondary">
              {study.description}
            </Text>
            <Wrap spacing={2}>
              {study.stack.map((item) => (
                <WrapItem key={item}>
                  <Tag fontFamily="mono" fontSize="11px" color="text.secondary" bg="transparent" border="1px solid" borderColor="border.default" borderRadius="14px">
                    {item}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  )
}
