import { NextFunction, Request, Response } from 'express'
import { LinkModel } from '../../models/link'

export default function deleteLinkMW() {
  return async function (req: Request, res: Response, next: NextFunction) {
    // Save IDs
    const linkId = req.params.linkId
    // Get required object
    await LinkModel.findByIdAndDelete(linkId)
    // Check existence
    return next()
  }
}
