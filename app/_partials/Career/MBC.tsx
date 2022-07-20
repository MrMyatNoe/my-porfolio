import { Divider, Heading, Text, VStack } from '@chakra-ui/react'

export const MBC = () => {
  return (
    <>
      <VStack spacing={1} mt={4}>
        <VStack spacing="none">
          <Heading fontSize="xl" fontWeight="black">
            MBC Software Development(June 2018 - Dec 2020)
          </Heading>
          <Heading fontSize="xl" fontWeight="black">
            Fullstack Java Developer
          </Heading>
        </VStack>

        <VStack mt={2} spacing={1}>
          <Heading fontSize="xl" fontWeight="black">
            Maintenance the framework
          </Heading>
          <Text fontSize="xl">Add new feature</Text>
          <Text fontSize="xl">in framework for maintenance</Text>
          <Text fontSize="xl">using Java, GWT Framework, Jasper Report</Text>
          <Text fontSize="xl" color="gray.400">
            Java / GWT Framework / MSSQL2012 / Jasper Report
          </Text>
        </VStack>
      </VStack>

      <VStack spacing={1} mt={4}>
        <Heading fontSize="xl" fontWeight="black">
          FullStack Developer
        </Heading>
        <VStack mt={2} spacing={1}>
          <Heading fontSize="xl" fontWeight="black">
            Clinic Software
          </Heading>
          <Text fontSize="xl">for admins, doctors and cashiers</Text>
          <Text fontSize="xl">Took part coding</Text>
          <Text fontSize="xl">using Java, GWT Framework</Text>
          <Text fontSize="xl" color="gray.400">
            XHTML / Java / GWT Framework / MSSQL2012
          </Text>
        </VStack>
      </VStack>

      <VStack spacing={1} mt={4}>
        <Heading fontSize="xl" fontWeight="black">
          Backend API Developer
        </Heading>
        <VStack mt={2} spacing={1}>
          <Heading fontSize="xl" fontWeight="black">
            Reward mobile App
          </Heading>
          <Text fontSize="xl">for previllege customers</Text>
          <Text fontSize="xl">in both Admin Side and Client Side</Text>
          <Text fontSize="xl">using Java, GWT Framework</Text>
          <Text fontSize="xl" color="gray.400">
            REST API / Java / GWT Framework / MSSQL2012
          </Text>
        </VStack>
      </VStack>

      <VStack spacing={1} mt={4}>
        <Heading fontSize="xl" fontWeight="black">
          Backend API Developer
        </Heading>
        <VStack mt={2} spacing={1}>
          <Heading fontSize="xl" fontWeight="black">
            Ecommerce App
          </Heading>
          <Text fontSize="xl">from Architecture Design, Detail Design</Text>
          <Text fontSize="xl">to coding, testing</Text>
          <Text fontSize="xl">using Java, Spring Boot Framework</Text>
          <Text fontSize="xl" color="gray.400">
            REST API / Java8 / Spring Boot Framework / MongoDB
          </Text>
        </VStack>
        <Divider fontWeight="bold" />
      </VStack>
    </>
  )
}
