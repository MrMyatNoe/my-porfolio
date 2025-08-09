import { Divider, Heading, Text, VStack } from '@chakra-ui/react';

export const Allianz = () => {
  return (
    <VStack spacing={1} mt={['4', '8']} mb={['4', '8']}>
      <VStack spacing="none">
        <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
          Allianz Technology Thailand(July 2022 - Present)
        </Heading>
        <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
          Advanced Backend Developer
        </Heading>
      </VStack>

      <VStack mt={2} spacing={1}>
        <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
          Insurance Internal App
        </Heading>
        <Text fontSize="lg">For Underwriters</Text>
        <Text fontSize="lg">Taking Part MicroService using with</Text>
        <Text fontSize="lg">Java17, Spring Boot, Unit Testing, Contract Testing, PlayWright Testing </Text>
        <Text fontSize="lg">Github Actions, Microservice Following Agile Methodology</Text>
      </VStack>
    </VStack>
  )
}
