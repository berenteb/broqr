import { Flex, Text } from '@chakra-ui/react'

export function Footer() {
  return (
    <Flex flexDirection="row" justifyContent="space-between" color="gray.500" px="4" mx="auto" py={5} width="100%">
      <Text m={0}>&copy; 2022</Text>
      <Text m={0}>Bálint Berente</Text>
    </Flex>
  )
}
