import { NextFunction, Request, Response } from 'express'
import { InternalServerError } from 'http-errors'

const ping = (_: Request, res: Response<string>) => res.json('Pong!')

const e500 = (_: Request, __: Response<never>, next: NextFunction) =>
  next(new InternalServerError())

export { ping, e500 }
