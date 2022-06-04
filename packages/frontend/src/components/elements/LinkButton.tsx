import { Button, ButtonProps } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { ChildProp } from '../../types/childProp'

export type LinkProps = {
  external?: boolean
  url: string
}

export const LinkButton: React.FC<LinkProps & ButtonProps & ChildProp> = ({ external, url, children, ...props }) => {
  const navigate = useNavigate()
  return (
    <Button
      {...props}
      onClick={() => {
        if (external) window.open(url)
        else navigate(url)
      }}
    >
      {children}
    </Button>
  )
}
