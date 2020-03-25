import { NextFunction, Request, Response } from 'express'
import { Unauthorized } from 'http-errors'
import { connection } from '../db'

const list = async (req: Request, res: Response, next: NextFunction) => {
  const ongId = req.headers.authorization

  if (!ongId) {
    return next(new Unauthorized())
  }

  const incidents = await connection('incidents')
    .where('ong_id', ongId)
    .select('*')

  return res.json(incidents)
}

export { list }
