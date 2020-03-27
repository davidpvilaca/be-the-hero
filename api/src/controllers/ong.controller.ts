import { Request, Response } from 'express'
import { connection } from '../db'
import { generateUniqueId } from '../utils'

const create = async (req: Request, res: Response) => {
  const { name, email, whatsapp, city, uf } = req.body
  const id = generateUniqueId()

  await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf
  })

  return res.status(201).json({ id })
}

const list = async (_: Request, res: Response) => {
  const ongs = await connection('ongs').select('*')
  return res.json(ongs)
}

export { create, list }
