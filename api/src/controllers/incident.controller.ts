import { NextFunction, Request, Response } from 'express'
import { BadRequest, Forbidden, Unauthorized } from 'http-errors'
import * as R from 'ramda'
import { connection } from '../db'
import { IIncident, IIncidentQueryData, IOng } from '../interfaces'

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, value } = req.body
  const ongId = req.headers.authorization

  if (!ongId) {
    return next(new Unauthorized())
  }

  const [id] = await connection('incidents').insert({
    title,
    description,
    value,
    ong_id: ongId
  })

  return res.status(201).json({ id })
}

const list = async (req: Request, res: Response<IIncidentQueryData[]>) => {
  const { page = 1, limit = 5 } = req.query
  const incidents: Array<IIncident & IOng> = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(limit)
    .offset((page - 1) * limit)
    .select([
      'incidents.*',
      'ongs.id as ong_id',
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf'
    ])
  const [count] = await connection('incidents').count()
  res.header('X-Total-Count', String(count['count(*)']))
  res.header('X-Total-Pages', String(Math.ceil(count['count(*)'] / limit)))

  const result = incidents.map(incident => {
    return {
      ...R.pick(['id', 'ong_id', 'title', 'description', 'value'], incident),
      ong: {
        id: incident.ong_id,
        ...R.pick(['name', 'email', 'whatsapp', 'city', 'uf'], incident)
      }
    }
  })

  return res.json(result)
}

const deleteIncident = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const ongId = req.headers.authorization

  if (!ongId) {
    return next(new Unauthorized())
  }

  try {
    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first()

    if (incident.ong_id !== ongId) {
      return next(new Forbidden())
    }

    await connection('incidents')
      .where('id', id)
      .delete()

    return res.status(204).send()
  } catch (e) {
    return next(new BadRequest('ID não encontrado!'))
  }
}

export { create, list, deleteIncident }
