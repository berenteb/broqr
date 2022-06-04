import express from 'express'
import { LinkModel } from '../models/link'
import { Configuration } from '../utils/configuration'

export default function redirectMW() {
  return async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    const shortId = req.params.shortId || ''
    const link = await LinkModel.findOne({ shortId: shortId })
    if (!link) return next('Érvénytelen link.')
    res.redirect(link.url)
    if (link.timestamps.length < Configuration.MAX_TIMESTAMPS) {
      link.set('timestamps', [...link.timestamps, Date.now()])
      await link.save()
    }
  }
}
