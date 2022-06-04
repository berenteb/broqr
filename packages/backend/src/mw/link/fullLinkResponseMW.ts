import express from 'express'
import { Configuration } from '../../utils/configuration'
import { LinkInterface } from '../../models/link'

export default function fullLinkResponseMW() {
  return async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    const responseData = { generatedLink: Configuration.SERVICE_URL + '/' + (res.locals.payload as LinkInterface).shortId }
    res.send(responseData)
  }
}
