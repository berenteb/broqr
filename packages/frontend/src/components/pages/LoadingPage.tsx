import React from 'react'
import { Page } from '../layout/Page'
import { Center } from '@chakra-ui/react'
import { Loading } from '../../utils/Loading'

export const LoadingPage: React.FC = () => {
  return (
    <Page height="100vh">
      <Center flex={1}>
        <Loading />
      </Center>
    </Page>
  )
}
