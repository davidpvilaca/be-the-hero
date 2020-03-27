import * as request from 'supertest'
import connection from '../src/db/connection'
import app from '../src/main'
import { generateUniqueId } from '../src/utils'
import { IOng } from './../src/interfaces'

describe('PROFILE', () => {
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
      .get('/profile')
      .set('Authorization', ONG.id)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toHaveLength(0)
  })
})
