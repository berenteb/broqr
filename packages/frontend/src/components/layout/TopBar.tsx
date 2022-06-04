import React from 'react'
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { useAuthContext } from '../../utils/useAuthContext'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { FaUser } from 'react-icons/fa'
import { Navbar } from '../elements/navigation/Navbar'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../utils/paths'

export const TopBar: React.FC = () => {
  const { user, logout } = useAuthContext()
  const navigate = useNavigate()
  return (
    <Flex flexDirection="row" align="flex-start" justify={['space-between', 'space-between', 'flex-end']} width="100%">
      <Navbar />
      <Menu>
        <MenuButton as={Button} backgroundColor="white" rightIcon={<ChevronDownIcon boxSize={5} />}>
          <Flex alignItems="center">
            <Text mr={1} my={0}>
              {user?.username}
            </Text>
            <FaUser />
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              navigate(Paths.PROFILE)
            }}
          >
            Profil
          </MenuItem>
          <MenuItem onClick={logout}>Kijelentkezés</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
