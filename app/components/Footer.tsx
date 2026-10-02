import { Contacts } from '~/components/Contacts'
import { SocialLinks } from '~/components/SocialLinks'
import { resumeData } from '~/data/resume'

import { Box, Container, Flex, Text, VStack } from '@chakra-ui/react'

export function Footer() {
  const { socialLinks, contacts, name } = resumeData.personalInfo

  return (
    <Box as="footer" id="contact" py={10}>
      <Container maxW="1080px" px={[5, 8, 16]} data-testid="content-container">
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" gap={6}>
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing={1}>
            <Contacts contacts={contacts} />
          </VStack>
          <SocialLinks links={socialLinks} />
          <Text fontSize="12px" color="text.secondary">
            © {new Date().getFullYear()} {name}
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}
