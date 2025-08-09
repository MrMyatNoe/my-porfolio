import { Divider, Heading, Text, VStack } from '@chakra-ui/react'

export const MBC = () => {
  return (
    <>
      <VStack spacing={1} mt={4} mb={4}>
        <VStack spacing="none">
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            MBC Software Development(June 2018 - Dec 2020)
          </Heading>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Fullstack Java Developer
          </Heading>
        </VStack>

        <VStack mt={2} spacing={1}>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Maintenance the framework
          </Heading>
          <Text fontSize="lg">Add new feature</Text>
          <Text fontSize="lg">in framework for maintenance</Text>
          <Text fontSize="lg">using Java, GWT Framework, Jasper Report</Text>
          <Text fontSize="lg">
            Java / GWT Framework / MSSQL2012 / Jasper Report
          </Text>
        </VStack>
      </VStack>

      <VStack spacing={1} mt={4}>
        <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
          FullStack Developer
        </Heading>
        <VStack mt={2} spacing={1}>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Clinic Software
          </Heading>
          <Text fontSize="lg">for admins, doctors and cashiers</Text>
          <Text fontSize="lg">Took part coding</Text>
          <Text fontSize="lg">using Java, GWT Framework</Text>
          <Text fontSize="lg">XHTML / Java / GWT Framework / MSSQL2012</Text>
        </VStack>
      </VStack>

      <VStack spacing={1} mt={4}>
        <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
          Backend Developer
        </Heading>
        <VStack mt={2} spacing={1}>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Reward Mobile App
          </Heading>
          <Text fontSize="lg">for previllege customers</Text>
          <Text fontSize="lg">in both Admin Side and Client Side</Text>
          <Text fontSize="lg">using Java, GWT Framework</Text>
          <Text fontSize="lg">REST API / Java / GWT Framework / MSSQL2012</Text>
        </VStack>
      </VStack>

      <VStack spacing={1} mt={4}>
        <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
          Backend Developer
        </Heading>
        <VStack mt={2} spacing={1} mb={['4', '8']}>
          <Heading fontSize={['15px', '20px']} fontWeight="bold" letterSpacing="1px" size={['md', 'lg']}>
            Ecommerce App
          </Heading>
          <Text fontSize="lg">from Architecture Design, Detail Design</Text>
          <Text fontSize="lg">to coding, testing</Text>
          <Text fontSize="lg">using Java, Spring Boot Framework</Text>
          <Text fontSize="lg">
            REST API / Java8 / Spring Boot Framework / MongoDB
          </Text>
        </VStack>
        <Divider fontWeight="bold" />
      </VStack>
    </>
  )
}
