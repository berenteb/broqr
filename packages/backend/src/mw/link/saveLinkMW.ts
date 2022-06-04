import { NextFunction, Request, Response } from 'express'
import { User, UserInterface } from '../../models/user'
import { LinkModel } from '../../models/link'
import generateRandomString from '../../utils/randomString'

export default function saveLinkMW(create: boolean = false) {
  return async function (req: Request, res: Response, next: NextFunction) {
    // Save IDs
    const linkId = req.params.linkId
    const userId = (req.user as UserInterface)._id
    // Create / get required objects
    const link = create ? new LinkModel() : await LinkModel.findById(linkId)
    const user = await User.findById(userId)
    // Check existence
    if (!link) return next('Nincs ilyen link!')
    if (!user) return next('Nincs felhasználó, akihez menteni lehet a linket!')
    // Get shortId
    let shortId = link.shortId
    // Check if shortId already used (low probability)
    let linkWithSameShortId
    do {
      shortId = generateRandomString()
      linkWithSameShortId = await LinkModel.findOne({ shortId: shortId })
    } while (linkWithSameShortId?.name && !create)
    // Set fields
    link.set('name', req.body.name)
    link.set('url', req.body.url)
    if (create) {
      link.set('shortId', shortId)
      user.set('linkIds', [...user.linkIds, link._id])
    }
    // Save objects
    link.save((linkResult) => {
      user.save((userResult) => {
        res.locals.payload = link
        return next(linkResult || userResult)
      })
    })
  }
}
