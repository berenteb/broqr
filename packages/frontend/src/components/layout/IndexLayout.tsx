import { Flex } from '@chakra-ui/react'
import * as React from 'react'
import { ChildProp } from '../../types/childProp'

type IndexLayoutProps = {
  background?: string
}

export const IndexLayout: React.FC<IndexLayoutProps & ChildProp> = ({ background, children }) => {
  return (
    <Flex direction="column" height="100vh" background={background}>
      {children}
    </Flex>
  )
}
