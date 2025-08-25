import { LuMail, LuMapPin, LuPhone } from 'react-icons/lu';

import { HStack, Text } from '@chakra-ui/react';

const iconMap = {
  LuMapPin: LuMapPin,
  LuPhone: LuPhone,
  LuMail: LuMail,
} as const

type IconKey = keyof typeof iconMap

interface Contact {
  key: string
  contact: string
  icon: string
}

interface ContactProps {
  contacts: Contact[]
}

export function Contacts({ contacts }: ContactProps) {
  return (
    <>
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
    </>
  )
}
