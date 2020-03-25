import { Request, Response } from 'express'

const ping = (_: Request, res: Response<string>) => res.json('Pong!')

export { ping }
