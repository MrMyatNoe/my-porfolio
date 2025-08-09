import { Flex, Heading } from '@chakra-ui/react'

import { Nanyan } from './Nanyan'
import { IHRP } from './IHRP'

export const Freelance = () => {
  return (
    <>
      <Flex align="center" direction="column" mt={['10', '12']} mb={['10', '12']}>
        <Heading fontSize={['20px', '25px']} size="lg" letterSpacing="2px">
          Freelance
        </Heading>
        <IHRP />
        <Nanyan />
      </Flex>
    </>
  )
}
