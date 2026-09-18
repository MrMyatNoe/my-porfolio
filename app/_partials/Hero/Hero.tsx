import { SocialLinks } from '~/components/SocialLinks'
import { resumeData } from '~/data/resume'

import { Box, Button, Flex, HStack, Heading, Link, Text, VStack } from '@chakra-ui/react'

import { HeroDiagram } from './HeroDiagram'

// Reconciles the long-standing mismatch between resumeData.personalInfo.title
// ("Senior Software Engineer") and the current role in career.ts's Allianz
// milestone ("Backend Developer"). Kept as a local constant instead of editing
// either data file — don't revert this to resumeData.personalInfo.title, that
// reintroduces the mismatch.
const CURRENT_TITLE = 'Senior Backend Developer'

export function Hero() {
  const { name, description, socialLinks } = resumeData.personalInfo

  return (
    <Flex
      as="section"
      align="center"
      gap={{ base: 10, lg: 16 }}
      px={[5, 8, 16]}
      py={[10, 10, 16]}
      direction={{ base: 'column', lg: 'row' }}
    >
      <VStack align="flex-start" spacing={5} maxW="600px" flexShrink={0}>
        <HStack spacing={2}>
          <Box w="8px" h="8px" borderRadius="full" bg="text.accent" />
          <Text fontSize="13px" color="text.secondary">
            Available for senior backend &amp; platform roles
          </Text>
        </HStack>

        <Box>
          <Heading as="h1" fontFamily="heading" fontSize={{ base: '36px', md: '44px', lg: '56px' }} lineHeight="1.05">
            {name}
          </Heading>
          <Text fontFamily="heading" fontSize={{ base: '18px', md: '20px', lg: '22px' }} fontWeight="500" color="text.accent" mt={2}>
            {CURRENT_TITLE}
          </Text>
        </Box>

        <Text fontSize="16px" lineHeight="1.6" color="text.secondary" maxW="480px">
          {description}
        </Text>

        <HStack spacing={{ base: 6, md: 8 }} pt={2}>
          <VStack align="flex-start" spacing={0}>
            <Text fontFamily="heading" fontSize="26px" fontWeight="700">7+</Text>
            <Text fontSize="12px" color="text.secondary">Years shipping backend systems</Text>
          </VStack>
          <VStack align="flex-start" spacing={0}>
            <Text fontFamily="heading" fontSize="26px" fontWeight="700">6</Text>
            <Text fontSize="12px" color="text.secondary">Production platforms</Text>
          </VStack>
        </HStack>

        <HStack spacing={3} pt={2} flexWrap="wrap">
          <Button as="a" href="#experience" bg="text.accent" color="bg.canvas" _hover={{ opacity: 0.9 }} borderRadius="8px" fontSize="14px">
            View experience
          </Button>
          <Button as="a" href="#contact" variant="outline" borderColor="text.accent" color="text.accent" borderRadius="8px" fontSize="14px">
            Get in touch
          </Button>
          <Link href="/resume.pdf" download fontSize="14px" fontWeight="600" color="text.accent">
            Download résumé
          </Link>
        </HStack>

        <SocialLinks links={socialLinks} />
      </VStack>

      <HeroDiagram name={name} />
    </Flex>
  )
}
