import * as React from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'
import { ChildProp } from '../../types/childProp'

export const Container: React.FC<FlexProps & ChildProp> = ({ children, ...props }) => (
  <Flex flexDirection="column" px={5} mx="auto" py={5} boxSizing="border-box" maxWidth={['100%', '48rem', '48rem', '64rem']} {...props}>
    {children}
  </Flex>
)
