import { resumeData } from '~/data/resume';

import { Box, Flex, HStack } from '@chakra-ui/react';

import { SocialLinks } from './SocialLinks';

export function Footer() {
  const { socialLinks } = resumeData.personalInfo
  return (
    <Flex dir="row" align="center" justify="center" p={10}>
      <Box flex={1}></Box>
      <HStack flex={1} dir="row" align="center" justify="center" spacing={6}>
        <SocialLinks links={socialLinks} />
      </HStack>
      <Box flex={1}></Box>
    </Flex>
  )
}
