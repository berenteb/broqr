import { NextFunction, Request, Response } from 'express'
import { LinkModel } from '../../models/link'

export default function getLinkMW() {
  return async function (req: Request, res: Response, next: NextFunction) {
    // Save IDs
    const linkId = req.params.linkId
    // Get required object
    const link = await LinkModel.findById(linkId)
    // Check existence
    if (!link) return next('Nincs ilyen link!')
    res.locals.payload = link
    return next()
  }
}
