import React, { ReactElement } from 'react'
import { Page } from './Page'
import { Flex, Heading } from '@chakra-ui/react'
import { ChildProp } from '../../types/childProp'

type AdminPageProps = {
  heading: string
  rightComponent?: ReactElement
}

export const AdminPage: React.FC<AdminPageProps & ChildProp> = ({ children, heading, rightComponent }) => {
  return (
    <Page backgroundColor="white" borderRadius="lg" loginRequired width="100%" maxHeight="m" mt={5} overflow="auto">
      <Flex justify="space-between" align="center" mb={5}>
        <Heading as="h2">{heading}</Heading>
        {rightComponent}
      </Flex>
      {children}
    </Page>
  )
}
