import { NextFunction, Request, Response } from 'express'
import { User, UserInterface } from '../../models/user'
import { LinkModel } from '../../models/link'
import generateRandomString from '../../utils/randomString'

export default function editApiKey(remove: boolean = false) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const user = await User.findById((req.user as UserInterface)._id)
    console.log(user)
    if (!user) return next('Nem található felhasználó!')
    user.apiKey = remove ? null : generateRandomString(20)
    user.save((userResult) => {
      return next(userResult)
    })
  }
}
