import * as request from 'supertest'
import connection from '../src/db/connection'
import app from '../src/main'

describe('ONG', () => {
  const APAD = {
    name: 'APAD',
    email: 'apad@apad.com',
    whatsapp: '27999999999',
    city: 'Rio do Sul',
    uf: 'SC'
  }

  beforeEach(async () => {
    await connection.migrate.latest()
  })

  afterEach(async () => {
    await connection.migrate.rollback()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('should be able to create a new ONG', async () => {
    const res = await request(app)
      .post('/ongs')
      .send(APAD)
    expect(res.body).toHaveProperty('id')
    expect(res.body.id).toHaveLength(8)
    expect(res.status).toBe(201)
  })

  it('should be list all ONGS empty', async () => {
    const res = await request(app).get('/ongs')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toHaveLength(0)
  })

  it('should be list all ONGS with a element', async () => {
    await request(app)
      .post('/ongs')
      .send(APAD)
    const res = await request(app).get('/ongs')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toHaveLength(1)
    expect(res.body[0]).toMatchObject(APAD)
  })
})
