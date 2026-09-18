import { LuMenu, LuMoon, LuSun, LuX } from 'react-icons/lu'
import { resumeData } from '~/data/resume'

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  useColorMode,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

const NAV_LINKS = [
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#case-studies', label: 'Case studies' },
  { href: '#projects', label: 'Projects' },
  { href: '#learning', label: 'Learning' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onToggle } = useDisclosure()
  const { name } = resumeData.personalInfo
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <Box
      as="header"
      pos="sticky"
      top="0"
      zIndex={1000}
      bg="bg.surface"
      borderBottom="1px solid"
      borderColor="border.default"
      backdropFilter="blur(8px)"
    >
      <Flex align="center" justify="space-between" px={[5, 8]} h="72px">
        <HStack spacing={3}>
          <Flex
            w="36px"
            h="36px"
            border="1px solid"
            borderColor="text.accent"
            borderRadius="8px"
            align="center"
            justify="center"
            fontFamily="mono"
            fontSize="12px"
            color="text.accent"
          >
            {initials}
          </Flex>
          <Box fontFamily="heading" fontWeight="600" fontSize="17px">
            {name}
          </Box>
        </HStack>

        <HStack spacing={8} display={{ base: 'none', md: 'flex' }} data-testid="desktop-nav">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} fontSize="14px" color="text.secondary">
              {link.label}
            </Link>
          ))}
        </HStack>

        <HStack spacing={2}>
          <IconButton
            aria-label="Toggle color theme"
            icon={colorMode === 'light' ? <LuMoon size={16} /> : <LuSun size={16} />}
            onClick={toggleColorMode}
            variant="outline"
            borderColor="border.default"
            bg="bg.surfaceRaised"
            size="sm"
            borderRadius="8px"
          />
          <IconButton
            aria-label="Toggle menu"
            icon={isOpen ? <LuX size={16} /> : <LuMenu size={16} />}
            onClick={onToggle}
            variant="outline"
            borderColor="border.default"
            bg="bg.surfaceRaised"
            size="sm"
            borderRadius="8px"
            display={{ base: 'inline-flex', md: 'none' }}
          />
        </HStack>
      </Flex>

      {isOpen && (
        <VStack
          align="stretch"
          spacing={4}
          px={5}
          pb={5}
          display={{ base: 'flex', md: 'none' }}
          borderTop="1px solid"
          borderColor="border.default"
          data-testid="mobile-nav"
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} fontSize="15px" color="text.primary" onClick={onToggle}>
              {link.label}
            </Link>
          ))}
        </VStack>
      )}
    </Box>
  )
}
