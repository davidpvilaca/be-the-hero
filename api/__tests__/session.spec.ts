import * as request from 'supertest'
import connection from '../src/db/connection'
import app from '../src/main'
import { IOng } from './../src/interfaces'

describe('SESSION', () => {
  let ONG: IOng

  beforeEach(async () => {
    await connection.migrate.latest()
    const apad = {
      name: 'APAD',
      email: 'apad@apad.com',
      whatsapp: '27999999999',
      city: 'Rio do Sul',
      uf: 'SC'
    }
    const { body } = await request(app)
      .post('/ongs')
      .send(apad)

    ONG = { ...apad, ...body }
  })

  afterEach(async () => {
    await connection.migrate.rollback()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('should be able to create a session', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ id: ONG.id })
    expect(res.body).toMatchObject({ id: ONG.id, name: ONG.name })
    expect(res.status).toBe(200)
  })
})
