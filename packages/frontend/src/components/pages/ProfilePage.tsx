import React from 'react'
import { RecordGrid, SeparatorGridItem } from '../elements/Record'
import { Button, GridItem } from '@chakra-ui/react'
import { AdminPage } from '../layout/AdminPage'
import { useAuthContext } from '../../utils/useAuthContext'
import axios from 'axios'
import { API_BASE_URL } from '../../utils/configurations'
import { GetAuthHeader } from '../../utils/getAuthHeader'
import { DeleteButton } from '../elements/DeleteButton'
import { IoReloadCircle } from 'react-icons/io5'

export const ProfilePage: React.FC = () => {
  const { user, updateUser, token } = useAuthContext()
  const onEdit = () => {
    if (token) {
      axios
        .post(API_BASE_URL + '/apiKey', undefined, GetAuthHeader(token))
        .then(updateUser)
        .catch((err) => {
          console.log(err)
        })
    }
  }
  const onDelete = () => {
    if (token) axios.delete(API_BASE_URL + '/apiKey', GetAuthHeader(token)).then(updateUser)
  }
  return (
    <AdminPage heading={user?.username || 'Ismeretlen'}>
      <RecordGrid colCount={1}>
        <GridItem>API kulcs</GridItem>
        <GridItem />
        <SeparatorGridItem width={2} />
        <GridItem>{user?.apiKey || 'Nincs'}</GridItem>
        <GridItem>
          <Button colorScheme="theme" variant="ghost" onClick={onEdit}>
            <IoReloadCircle size={30} />
          </Button>
          <DeleteButton onDelete={onDelete} />
        </GridItem>
      </RecordGrid>
    </AdminPage>
  )
}
