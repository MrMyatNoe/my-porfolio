import { Divider, Heading, Text, VStack } from '@chakra-ui/react'

export const Nanyan = () => {
  return (
    <>
      <VStack spacing={1} mt={['4', '8']} mb={['4', '8']}>
        <VStack spacing={1}>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Nan Yan
          </Heading>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            First Phase (Oct 2020 - Feb 2021)
          </Heading>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Backend Developer
          </Heading>
        </VStack>
        <VStack mt={2} spacing={1}>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Ecommerce App
          </Heading>
          <Text fontSize="lg">using Java, Spring Boot Framework</Text>
          <Text fontSize="lg">
            GraphQL / Java8 / Spring Boot Framework / Hibernate / MySQL
          </Text>
        </VStack>
      </VStack>

      <VStack spacing={1} mt={['4', '8']} mb={['4', '8']}>
        <VStack spacing="none">
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Second Phase (June 2021 - Dec 2021)
          </Heading>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Full Stack Developer
          </Heading>
        </VStack>
        <VStack mt={2} spacing={1}>
          <Text fontSize="lg">Ecommerce App</Text>
          <Text fontSize="lg">using Node.js, Express.js, React, Chakra UI</Text>
          <Text fontSize="lg">GraphQL / Nest.js / Typescript/ Prisma / Zod / Postgresql</Text>
        </VStack>
      </VStack>

      <VStack spacing={1} mt={['4', '8']} mb={['4', '8']}>
        <VStack spacing="none">
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Third Phase(Jan 2022 - Feb 2022)
          </Heading>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Full Stack Developer
          </Heading>
        </VStack>
        <VStack mt={2} spacing={1}>
          <Text fontSize="lg">Ecommerce App</Text>
          <Text fontSize="lg">using Nest.js, Remix.run, Chakra UI</Text>
          <Text fontSize="lg">Rest API / Typescript/ Prisma / Zod / Mongo</Text>
        </VStack>
      </VStack>

      <VStack spacing={1} mt={['4', '8']} mb={['4', '8']}>
        <VStack spacing="none">
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Fourth Phase (March 2022 - Apr 2022)
          </Heading>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Frontend Developer
          </Heading>
        </VStack>
        <VStack mt={2} spacing={1}>
          <Text fontSize="lg">Ecommerce App</Text>
          <Text fontSize="lg">using React.js, Mantine.dev</Text>
          <Text fontSize="lg">Typescript/ Prisma / Zod</Text>
        </VStack>
      </VStack>
    </>
  )
}
