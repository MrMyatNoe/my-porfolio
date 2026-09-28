import type { IconType } from 'react-icons'
import { LuBookOpen } from 'react-icons/lu'
import { SiAmazonaws, SiKubernetes } from 'react-icons/si'

import { Box, Container, Heading, HStack, SimpleGrid, Tag, Text, VStack } from '@chakra-ui/react'

import { Reveal } from '~/components/Reveal'

interface LearningEntry {
  icon: IconType
  name: string
  status: string
  source: string
  description: string
}

const LEARNING_ENTRIES: LearningEntry[] = [
  {
    icon: SiKubernetes,
    name: 'Kubernetes for Developers (CKAD Track)',
    status: 'In Progress',
    source: 'Udemy',
    description: 'Studying container orchestration, scheduling, and Kubernetes networking (killer.sh simulation exam).',
  },
  {
    icon: SiAmazonaws,
    name: 'AWS Solutions Architect – Associate Prep',
    status: 'In Progress',
    source: 'LinkedIn Learning',
    description: 'Exploring AWS services: EC2, Lambda, S3, RDS, SNS/SQS for cloud scaling.',
  },
  {
    icon: LuBookOpen,
    name: 'Designing Data-Intensive Applications',
    status: 'Reading',
    source: 'Book — Kleppmann',
    description: 'Reading about distributed systems, horizontal scaling, data consistency, and replication.',
  },
]

export function ContinuousLearning() {
  return (
    <Box as="section" id="learning" py={[10, 10, 14]} bg="bg.surface" borderY="1px solid" borderColor="border.default">
      <Container maxW="1080px" px={[5, 8, 16]} data-testid="content-container">
        <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
          Continuous learning
        </Heading>
        <Text fontSize="14px" color="text.secondary" mt={1}>
          What I&apos;m studying right now, outside of day-to-day project work.
        </Text>
        <SimpleGrid columns={1} spacing={4} mt={8} data-testid="learning-grid">
          {LEARNING_ENTRIES.map(({ icon: EntryIcon, name, status, source, description }, index) => (
            <Reveal key={name} delay={index * 0.06}>
              <HStack align="center" spacing={5} border="1px solid" borderColor="border.default" borderRadius="14px" bg="bg.surfaceRaised" p={6}>
                <Box flexShrink={0} w="40px" h="40px" borderRadius="10px" bg="bg.surface" border="1px solid" borderColor="border.default" display="flex" alignItems="center" justifyContent="center">
                  <EntryIcon size={20} color="var(--chakra-colors-text-accent)" />
                </Box>
                <VStack align="flex-start" spacing={1.5} flex={1}>
                  <HStack spacing={2} flexWrap="wrap">
                    <Text fontFamily="heading" fontWeight="600" fontSize="14.5px">
                      {name}
                    </Text>
                    <Tag fontFamily="mono" fontSize="10px" color="text.accentAmber" border="1px solid" borderColor="text.accentAmber" bg="transparent" borderRadius="full">
                      {status}
                    </Tag>
                    <Tag fontFamily="mono" fontSize="10px" color="text.secondary" border="1px solid" borderColor="border.default" bg="transparent" borderRadius="full">
                      {source}
                    </Tag>
                  </HStack>
                  <Text fontSize="13.5px" color="text.secondary" lineHeight="1.55">
                    {description}
                  </Text>
                </VStack>
              </HStack>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
