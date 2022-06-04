import React from 'react'
import { LinkProps as ChakraLinkProps } from '@chakra-ui/layout'
import { Link } from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import { LinkProps } from './LinkButton'
import { ChildProp } from '../../types/childProp'

export const SimpleLink: React.FC<LinkProps & ChakraLinkProps & ChildProp> = ({ external, url, children, ...props }) => {
  return (
    <Link {...props} href={url} isExternal={external} target="_blank">
      {children}
      <LinkIcon marginLeft={1} />
    </Link>
  )
}
