import type { IconType } from 'react-icons'
import {
  LuCheckCircle,
  LuDatabase,
  LuMonitor,
  LuNetwork,
  LuRocket,
  LuServer,
  LuSmartphone,
} from 'react-icons/lu'

import { Box, Heading, HStack, SimpleGrid, Tag, Text, Wrap, WrapItem } from '@chakra-ui/react'

interface SkillCategory {
  label: string
  icon: IconType
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  { label: 'Languages & backend', icon: LuServer, skills: ['java', 'spring-boot', 'typescript', 'node.js', 'nestjs'] },
  { label: 'APIs & messaging', icon: LuNetwork, skills: ['rest-api', 'graphql', 'kafka', 'microservices'] },
  { label: 'Databases', icon: LuDatabase, skills: ['postgresql', 'mysql', 'mongodb', 'mssql', 'oracle-db'] },
  { label: 'Frontend', icon: LuMonitor, skills: ['react', 'remix', 'next.js', 'chakra-ui'] },
  { label: 'Mobile', icon: LuSmartphone, skills: ['flutter', 'firebase', 'admob'] },
  { label: 'Testing & quality', icon: LuCheckCircle, skills: ['unit-testing', 'contract-testing', 'playwright'] },
  { label: 'Delivery & DevOps', icon: LuRocket, skills: ['github-actions', 'ci/cd', 'agile'] },
]

export function Skill() {
  return (
    <Box as="section" id="skills" px={[5, 8, 16]} py={[10, 10, 14]} bg="bg.surface" borderY="1px solid" borderColor="border.default">
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Skills
      </Heading>
      <Text fontSize="14px" color="text.secondary" mt={1}>
        Technologies I work with in production, grouped by where they sit in a system.
      </Text>
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={9} mt={8}>
        {SKILL_CATEGORIES.map(({ label, icon: CategoryIcon, skills }) => (
          <Box key={label} borderLeft="2px solid" borderColor="text.accent" pl={4}>
            <HStack spacing={2} borderBottom="1px solid" borderColor="border.default" pb={2.5}>
              <CategoryIcon size={16} color="var(--chakra-colors-text-accent)" />
              <Text fontFamily="heading" fontSize="15px" fontWeight="600">
                {label}
              </Text>
            </HStack>
            <Wrap spacing={2} mt={3.5}>
              {skills.map((skill) => (
                <WrapItem key={skill}>
                  <Tag fontFamily="mono" fontSize="12.5px" color="text.secondary" bg="bg.surfaceRaised" border="1px solid" borderColor="border.default" borderRadius="14px" px={3.5} py={1.5}>
                    {skill}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
