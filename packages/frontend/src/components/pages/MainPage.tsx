import React from 'react'
import { Page } from '../layout/Page'
import { LinkButton } from '../elements/LinkButton'
import { AbsolutePaths } from '../../utils/paths'

export function MainPage() {
  return (
    <Page>
      <LinkButton url={AbsolutePaths.LOGIN} colorScheme="theme">
        Bejelentkezés
      </LinkButton>
    </Page>
  )
}
