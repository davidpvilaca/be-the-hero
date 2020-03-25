import { NextFunction, Request, Response } from 'express'
import { BadRequest } from 'http-errors'
import { connection } from '../db'

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body

  const ong = await connection('ongs')
    .where('id', id)
    .select('name')
    .first()

  if (!ong) {
    return next(new BadRequest('No ONG found with this ID'))
  }

  return res.json({ id, ...ong })
}

export { create }
