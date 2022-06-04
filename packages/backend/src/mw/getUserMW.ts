import express from 'express'
import { UserInterface } from '../models/user'

export default function getUserMW() {
  return async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = req.user as UserInterface
    res.locals.payload = { username: user.username, apiKey: user.apiKey }
    return next()
  }
}
