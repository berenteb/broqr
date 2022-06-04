import { NextFunction, Request, Response } from 'express'
import { LinkInterface } from '../../models/link'

export default function getStatisticsMW() {
  return async function (req: Request, res: Response, next: NextFunction) {
    let interval = 10
    try {
      interval = parseInt(req.params.interval)
    } catch (e) {
      return next('Rossz intervallum formátum az URL-ben.')
    }
    const { timestamps } = res.locals.payload as LinkInterface
    const data = []
    const currentDate = new Date()
    currentDate.setHours(0)
    currentDate.setMinutes(0, 0, 0)
    for (let i = 0; i < interval; i++) {
      const selectedDate = new Date(currentDate.valueOf() - i * 86400000)
      let value = 0
      for (const ts of timestamps) {
        const tsDate = new Date(ts)
        if (
          tsDate.getFullYear() === selectedDate.getFullYear() &&
          tsDate.getMonth() === selectedDate.getMonth() &&
          tsDate.getDate() === selectedDate.getDate()
        ) {
          value++
        }
      }
      data.push({ name: selectedDate.toLocaleDateString('hu-HU'), value: value })
    }
    res.locals.payload = data.reverse()
    return next()
  }
}
