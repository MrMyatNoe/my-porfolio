import { Contacts } from '~/components/Contacts';
import { SocialLinks } from '~/components/SocialLinks';
import { resumeData } from '~/data/resume';

import { Box, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

export function Hero() {
  const { name, title, description, profileImage, socialLinks, contacts } =
    resumeData.personalInfo
  return (
    <>
      <Flex
        w="100%"
        px="6"
        py="5"
        align="center"
        gap="4"
        direction={['column', 'row']}
      >
        <Box w={['100%', '50%']}>
          <Stack spacing={4}>
            <Heading fontSize={['30px', '40px']} size="lg" letterSpacing="2px">
              Hello! This is
            </Heading>
            <Heading fontSize={['30px', '40px']} size="lg" letterSpacing="2px">
              {name}
            </Heading>
            <Text fontSize={['lg', 'xl']}>{title}</Text>
            <Text fontSize={['sm', 'md']} color="gray.500">
              {description}
            </Text>
            <Flex align="left" gap="6" direction="row">
              <SocialLinks links={socialLinks} />
            </Flex>
            <Flex align="left" gap="2" direction="column">
              <Contacts contacts={contacts} />
            </Flex>
          </Stack>
        </Box>
        <Box w={['100%', '50%']}>
          <Flex w="100%" justify={['center', 'right']}>
            <Image
              borderRadius="full"
              boxSize={['200px', '250px']}
              src={profileImage}
              alt={name}
            />
          </Flex>
        </Box>
      </Flex>
    </>
  )
}
