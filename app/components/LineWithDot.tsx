import { Box, Divider, Flex, useColorModeValue } from '@chakra-ui/react'

export function LineWithDot() {
  return (
    <Flex
      pos="relative"
      alignItems="center"
      mr={{ base: '40px', md: '40px' }}
      ml={{ base: '0', md: '40px' }}
    >
      <Divider
        orientation="vertical"
        pos="absolute"
        left="50%"
        height="calc(100% + 10px)"
        borderWidth="1px"
        top="0px"
      />
      <Box pos="relative" p="10px">
        <Box
          pos="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
          width="100%"
          height="100%"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          borderRadius="300px"
          border="3px solid rgb(4, 180, 180)"
          backgroundImage="none"
          bg={useColorModeValue('gray.600', 'gray.200')}
          opacity={1}
          backgroundColor="#ffffff"
        />
      </Box>
    </Flex>
  )
}
