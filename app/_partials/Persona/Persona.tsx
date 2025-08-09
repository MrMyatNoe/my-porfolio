import { Flex, Heading } from '@chakra-ui/react'
import { Best } from './Best'

export const Persona = () => {
  return (
    <>
      <Flex align="center" direction="column" mt={['10', '12']} mb={['10', '12']}>
        <Heading fontSize={['20px', '25px']} size="lg" letterSpacing="2px">
          Personal Project
        </Heading>
        <Best />
      </Flex>
    </>
  )
}
