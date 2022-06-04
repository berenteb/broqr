import { NextFunction, Request, Response } from 'express'
import { LinkModel } from '../../models/link'
import { UserInterface } from '../../models/user'

export default function getLinksMW() {
  return async function (req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserInterface
    // Get required object
    // Check existence
    res.locals.payload = await LinkModel.find({ _id: { $in: user.linkIds } })
    return next()
  }
}
