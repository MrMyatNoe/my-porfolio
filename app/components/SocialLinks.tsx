import {
  BsFacebook,
  BsGithub,
  BsLinkedin,
  BsMessenger,
  BsTwitter,
} from 'react-icons/bs'

import { Link } from '@chakra-ui/react'

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
    <>
      {links.map(({ href, icon, label }, index) => {
        const Icon = iconMap[icon as IconKey]
        return (
          <Link key={index} href={href} isExternal aria-label={label}>
            <Icon size="30" />
          </Link>
        )
      })}
    </>
  )
}
