import { LuSunMoon } from 'react-icons/lu'
import { MdOutlineWbSunny } from 'react-icons/md'
import { resumeData } from '~/data/resume'

import {
  Container,
  Flex,
  IconButton,
  Spacer,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { Link } from '@remix-run/react'

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { name } = resumeData.personalInfo
  return (
    <>
      <Flex
        as="nav"
        w="100%"
        px="6"
        py="5"
        align="center"
        borderBottom="1px"
        borderColor="gray.100"
        alignItems="center"
        pos="sticky"
        top="0"
      >
        <Stack
          align="left"
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row']}
          pt={[4, 4, 0, 0]}
          gap={8}
        >
          <Link to="/" style={{ fontWeight: 'bold', fontSize: 'xl' }}>
            {name.split(' ')[0]}
          </Link>
          <Link to="/" style={{ fontWeight: 'bold', fontSize: 'xl' }}>
            Skills
          </Link>
          <Link to="/" style={{ fontWeight: 'bold', fontSize: 'xl' }}>
            Experiences
          </Link>
          <Link to="/" style={{ fontWeight: 'bold', fontSize: 'xl' }}>
            Projects
          </Link>
          <Link to="/" style={{ fontWeight: 'bold', fontSize: 'xl' }}>
            Certificates
          </Link>
        </Stack>
        <Spacer />
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <LuSunMoon /> : <MdOutlineWbSunny />}
          onClick={toggleColorMode}
        />
      </Flex>
    </>
  )
}
