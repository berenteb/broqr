import express from 'express'

export default function apiMW(allowEmpty?: boolean) {
  return async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('\n' + req.originalUrl)
    if (!res.locals.payload && !allowEmpty) return next('Nem található adat!')
    res.send(res.locals.payload)
  }
}
