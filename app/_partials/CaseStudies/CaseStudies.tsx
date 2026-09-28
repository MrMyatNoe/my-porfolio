import { useState } from 'react'
import { LuLock } from 'react-icons/lu'

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  SimpleGrid,
  Tag,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

import { CaseStudyThumb } from '~/components/CaseStudyThumb'
import { Reveal } from '~/components/Reveal'

interface CaseStudy {
  key: string
  meta: string
  title: string
  description: string
  stack: string[]
  nda: boolean
  problem: string
  solution: string
  impact: string
}

const CASE_STUDIES: CaseStudy[] = [
  {
    key: 'underwriting',
    meta: 'Allianz Technology Thailand · 2022–Present',
    title: 'Underwriting platform microservices',
    description:
      'Took over backend ownership of the underwriting workbench, splitting a monolith into contract-tested microservices so underwriting and claims teams could ship independently.',
    stack: ['java17', 'spring-boot', 'kafka', 'playwright'],
    nda: true,
    problem:
      'The underwriting workbench was a single backend monolith shared across underwriting and claims teams.',
    solution:
      "Took over backend ownership and split the monolith into contract-tested microservices, so each team could ship independently without breaking the other's workflow.",
    impact: "Underwriting and claims teams can now ship independently, without one team's release blocking the other.",
  },
  {
    key: 'mobileweb',
    meta: 'Nan Yan Platform, Myanmar · 2020–2022',
    title: 'Multi-phase commerce platform',
    description:
      'Carried an e-commerce platform through four stack phases across backend, frontend, and full-stack work — from Spring Boot/Hibernate through NestJS/Prisma to a Remix + Chakra UI frontend.',
    stack: ['spring-boot', 'nestjs', 'prisma', 'remix'],
    nda: false,
    problem:
      "The e-commerce platform's stack needed to change across its backend, frontend, and full-stack work over its lifetime.",
    solution:
      'Carried the platform through successive stack phases — Spring Boot/Hibernate, then NestJS/Prisma, then a Remix + Chakra UI frontend — working across backend, frontend, and full-stack roles as needs changed.',
    impact: 'The platform continued shipping across each stack transition.',
  },
]

export function CaseStudies() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const active = CASE_STUDIES.find((study) => study.key === activeKey) ?? null

  const openStudy = (key: string) => {
    setActiveKey(key)
    onOpen()
  }

  return (
    <Box as="section" id="case-studies" px={[5, 8, 16]} py={[10, 10, 14]} bg="bg.surface" borderY="1px solid" borderColor="border.default">
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Architecture case studies
      </Heading>
      <Text fontSize="14px" color="text.secondary" mt={1}>
        Two systems I&apos;ve designed, built, and operate for employers.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={8}>
        {CASE_STUDIES.map((study, index) => (
          <Reveal key={study.key} delay={index * 0.08}>
            <VStack align="stretch" spacing={0} border="1px solid" borderColor="border.default" borderRadius="12px" bg="bg.surfaceRaised" overflow="hidden">
              <CaseStudyThumb nda={study.nda} />
              <VStack align="flex-start" spacing={4} p={7}>
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
                      <Tag fontFamily="mono" fontSize="11px" color="text.secondary" bg="transparent" border="1px solid" borderColor="border.default" borderRadius="full">
                        {item}
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>
                <HStack spacing={3} pt={1}>
                  <Button size="sm" bg="text.accent" color="bg.canvas" _hover={{ opacity: 0.9 }} borderRadius="8px" fontSize="13px" onClick={() => openStudy(study.key)}>
                    View solution
                  </Button>
                  {study.nda && (
                    <HStack spacing={1.5} border="1px dashed" borderColor="border.default" color="text.secondary" borderRadius="8px" px={3} py={1.5} fontSize="12px">
                      <LuLock size={12} />
                      <Text>Private</Text>
                    </HStack>
                  )}
                </HStack>
              </VStack>
            </VStack>
          </Reveal>
        ))}
      </SimpleGrid>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent bg="bg.surface">
          <DrawerCloseButton />
          {active && (
            <>
              <DrawerHeader fontFamily="heading">{active.title}</DrawerHeader>
              <DrawerBody>
                <VStack align="stretch" spacing={5} pb={6}>
                  <Text fontFamily="mono" fontSize="12px" color="text.secondary">
                    {active.meta}
                    {active.nda ? ' · NDA-safe summary' : ''}
                  </Text>
                  <Box>
                    <Text fontFamily="mono" fontSize="11px" letterSpacing="1.5px" color="text.accent" textTransform="uppercase" mb={2}>
                      Problem
                    </Text>
                    <Text fontSize="14px" color="text.primary" lineHeight="1.6">
                      {active.problem}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontFamily="mono" fontSize="11px" letterSpacing="1.5px" color="text.accent" textTransform="uppercase" mb={2}>
                      Architecture solution
                    </Text>
                    <Text fontSize="14px" color="text.primary" lineHeight="1.6">
                      {active.solution}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontFamily="mono" fontSize="11px" letterSpacing="1.5px" color="text.accent" textTransform="uppercase" mb={2}>
                      Tech stack
                    </Text>
                    <Wrap spacing={2}>
                      {active.stack.map((item) => (
                        <WrapItem key={item}>
                          <Tag fontFamily="mono" fontSize="11px" color="text.secondary" bg="bg.surfaceRaised" border="none" borderRadius="full">
                            {item}
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Box>
                  <Box>
                    <Text fontFamily="mono" fontSize="11px" letterSpacing="1.5px" color="text.accent" textTransform="uppercase" mb={2}>
                      Impact
                    </Text>
                    <Text fontSize="14px" color="text.primary" lineHeight="1.6">
                      {active.impact}
                    </Text>
                  </Box>
                </VStack>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
