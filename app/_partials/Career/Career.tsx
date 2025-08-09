import { Flex, Heading } from '@chakra-ui/react'

import { Allianz } from './Allianz'
import { FPT } from './FPT'
import { MBC } from './MBC'

export const Career = () => {
  return (
    <>
      <Flex align="center" direction="column"  mt={['10', '12']} mb={['10', '12']}>
        <Heading fontSize={['20px', '25px']} size="lg" letterSpacing="2px">
          Career
        </Heading>
        <FPT />
        <MBC />
        <Allianz />
      </Flex>
    </>
  )
}
