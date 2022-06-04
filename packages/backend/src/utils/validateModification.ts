import { UserInterface } from '../models/user'
import { NextFunction, Request, Response } from 'express'
import isIdValid from './isIdValid'

export default function validateLinkModification() {
  return async function (req: Request, res: Response, next: NextFunction) {
    const linkId = req.params.linkId || ''
    if (!isIdValid(linkId)) {
      return next('Rossz ID!')
    }
    const user = req.user as UserInterface
    if (user.linkIds.find((value) => value.toString() === linkId) !== undefined) {
      return next()
    } else {
      return res.status(403).json()
    }
  }
}
