import React, { ReactElement } from 'react'
import { Flex, Heading, VStack } from '@chakra-ui/react'
import { LinkButton } from '../elements/LinkButton'
import { FaLink, FaTh } from 'react-icons/fa'
import { useLocation } from 'react-router'
import { AbsolutePaths } from '../../utils/paths'
import { ChildProp } from '../../types/childProp'

export const SideBar: React.FC = () => {
  return (
    <VStack direction="column" mx={5} display={['none', 'none', 'flex']}>
      <Heading color="theme.500" mt={0} mb={0}>
        BroQR
      </Heading>
      <Flex flexDirection="column" alignItems="flex-start">
        <SideBarButton url={AbsolutePaths.DASHBOARD} leftIcon={<FaTh />}>
          Vezérlőpult
        </SideBarButton>
        <SideBarButton url={AbsolutePaths.LINK} leftIcon={<FaLink />}>
          Linkek
        </SideBarButton>
        {/*<SideBarButton url="#" leftIcon={<FaQrcode />}>*/}
        {/*  QR kódok*/}
        {/*</SideBarButton>*/}
      </Flex>
    </VStack>
  )
}
type SideBarButtonProps = {
  url: string
  leftIcon?: ReactElement
}
const SideBarButton: React.FC<SideBarButtonProps & ChildProp> = ({ children, url, leftIcon }) => {
  const location = useLocation()
  return (
    <LinkButton
      leftIcon={leftIcon}
      url={url}
      variant="ghost"
      colorScheme="gray"
      mt={5}
      backgroundColor={location.pathname === url ? 'white' : undefined}
      color={location.pathname === url ? 'theme.500' : 'gray.500'}
      _hover={{ backgroundColor: 'gray.300' }}
    >
      {children}
    </LinkButton>
  )
}
