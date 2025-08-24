import { BsGithub, BsLinkedin, BsMessenger, BsTwitter } from 'react-icons/bs'
import { LuMail, LuMapPin, LuPhone } from 'react-icons/lu'
import { resumeData } from '~/data/resume'

import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'

const iconMap = {
  BsLinkedin: BsLinkedin,
  BsTwitter: BsTwitter,
  BsGithub: BsGithub,
  BsMessenger: BsMessenger,
  LuMapPin: LuMapPin,
  LuPhone: LuPhone,
  LuMail: LuMail,
} as const

type IconKey = keyof typeof iconMap

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
              {socialLinks.map(({ href, icon }, index) => {
                const Icon = iconMap[icon as IconKey]
                return (
                  <Link key={index} href={href} isExternal>
                    <Icon size="20" />
                  </Link>
                )
              })}
            </Flex>
            <Flex align="left" gap="2" direction="column">
              {contacts.map(({ key, contact, icon }) => {
                const Icon = iconMap[icon as IconKey]
                return (
                  <HStack key={key}>
                    <Icon size="20" />
                    <Text fontSize={'sm'} color="gray.500">
                      {contact}
                    </Text>
                  </HStack>
                )
              })}
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
