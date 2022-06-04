import React from 'react'
import { Alert, AlertProps } from '@chakra-ui/react'
import { ChildProp } from '../../types/childProp'

export const StyledInfoBox: React.FC<AlertProps & ChildProp> = ({ ...props }) => {
  return <Alert {...props} borderRadius="md" mt={5} />
}
