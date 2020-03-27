import * as request from 'supertest'
import connection from '../src/db/connection'
import app from '../src/main'
import { generateUniqueId } from '../src/utils'
import { IOng } from './../src/interfaces'

describe('SESSION', () => {
  const ONG: IOng = {
    id: generateUniqueId(),
    name: 'APAD',
    email: 'apad@apad.com',
    whatsapp: '27999999999',
    city: 'Rio do Sul',
    uf: 'SC'
  }

  beforeEach(async () => {
    await connection.migrate.latest()
    await connection('ongs').insert(ONG)
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

  it('should not be able to create a session with invalid ong id', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ id: generateUniqueId() })
    expect(res.body).toHaveProperty('message')
    expect(res.status).toBe(400)
  })

  it('should not be able to create a session without ong id', async () => {
    const res = await request(app)
      .post('/sessions')
      .send()
    expect(res.body).toHaveProperty('message')
    expect(res.status).toBe(400)
  })
})
