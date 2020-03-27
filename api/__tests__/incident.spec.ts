import * as request from 'supertest'
import connection from '../src/db/connection'
import { IIncident, IOng } from '../src/interfaces'
import app from '../src/main'
import { generateUniqueId } from '../src/utils'

describe('INCIDENT', () => {
  const INCIDENT1 = {
    title: 'Caso 1',
    description: 'Detalhe do caso',
    value: 120
  }
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

  it('should be able to create a new incident', async () => {
    const res = await request(app)
      .post('/incidents')
      .set('Authorization', ONG.id)
      .send(INCIDENT1)
    expect(res.body).toHaveProperty('id')
    expect(typeof res.body.id).toBe('number')
    expect(res.status).toBe(201)
  })

  it('should be list all incidents empty', async () => {
    const res = await request(app)
      .get('/incidents')
      .set('Authorization', ONG.id)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toHaveLength(0)
  })

  it('should be list all incidents with a element', async () => {
    await request(app)
      .post('/incidents')
      .set('authorization', ONG.id)
      .send(INCIDENT1)
    const res = await request(app)
      .get('/incidents')
      .set('Authorization', ONG.id)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toHaveLength(1)
    expect(res.body[0]).toMatchObject(INCIDENT1)
  })

  it('should be able to delete a incident', async () => {
    const { body: incidnetCreated }: { body: IIncident } = await request(app)
      .post('/incidents')
      .set('authorization', ONG.id)
      .send(INCIDENT1)

    const res = await request(app)
      .delete(`/incidents/${incidnetCreated.id}`)
      .set('Authorization', ONG.id)
    expect(res.status).toBe(204)
    expect(JSON.stringify(res.body)).toMatch('{}')
  })
})
