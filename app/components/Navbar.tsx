import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Spacer, Text, useColorMode } from '@chakra-ui/react'

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex
      as="header"
      p={5}
      borderBottom="1px"
      borderColor="gray.200"
      alignItems="center"
    >
      <Text fontSize="xl" fontWeight="bold">
        Political Ideology Dashboard
      </Text>
      <Spacer />
      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  )
}
