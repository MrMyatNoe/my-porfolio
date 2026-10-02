import {
  BsFacebook,
  BsGithub,
  BsLinkedin,
  BsMessenger,
  BsTwitter,
} from 'react-icons/bs'

import { Flex, HStack, Link } from '@chakra-ui/react'

const iconMap = {
  BsLinkedin: BsLinkedin,
  BsTwitter: BsTwitter,
  BsGithub: BsGithub,
  BsMessenger: BsMessenger,
  BsFacebook: BsFacebook,
} as const

type IconKey = keyof typeof iconMap

interface SocialLink {
  href: string
  icon: string
  label: string
}

interface SocialLinksProps {
  links: SocialLink[]
}

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <HStack spacing={2.5}>
      {links.map(({ href, icon, label }) => {
        const Icon = iconMap[icon as IconKey]
        return (
          <Link key={label} href={href} isExternal aria-label={label}>
            <Flex
              w="32px"
              h="32px"
              border="1px solid"
              borderColor="text.accent"
              borderRadius="8px"
              align="center"
              justify="center"
              color="text.accent"
            >
              <Icon size={16} />
            </Flex>
          </Link>
        )
      })}
    </HStack>
  )
}
