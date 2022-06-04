import express from 'express'
import { UserInterface } from '../models/user'
import * as jwt from 'jsonwebtoken'
import { Configuration } from '../utils/configuration'

if (!Configuration.JWT_SECRET) {
  console.error('JWT_SECRET nem létezik!')
  process.exit(1)
}

export default function loginMW() {
  return async function (req: express.Request, res: express.Response) {
    const user = req.user as UserInterface
    if (!user) {
      return res.status(401).json({ status: 'error', code: 'unauthorized' })
    } else {
      const token = jwt.sign({ username: user.username }, Configuration.JWT_SECRET || '')
      res.status(200).send({ token: token })
    }
  }
}
