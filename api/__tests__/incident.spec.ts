import * as request from 'supertest'
import connection from '../src/db/connection'
import { IOng } from '../src/interfaces'
import app from '../src/main'
import { generateUniqueId } from '../src/utils'

describe('INCIDENT', () => {
  const ONG: IOng = {
    id: generateUniqueId(),
    name: 'APAD',
    email: 'apad@apad.com',
    whatsapp: '27999999999',
    city: 'Rio do Sul',
    uf: 'SC'
  }
  const INCIDENT1 = {
    title: 'Caso 1',
    description: 'Detalhe do caso',
    value: 120
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

  /**
   * Success cases
   */
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
    await connection('incidents').insert({ ...INCIDENT1, ong_id: ONG.id })
    const res = await request(app)
      .get('/incidents')
      .set('Authorization', ONG.id)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toHaveLength(1)
    expect(res.body[0]).toMatchObject(INCIDENT1)
  })

  it('should be able to delete a incident', async () => {
    const [id]: number[] = await connection('incidents').insert({
      ...INCIDENT1,
      ong_id: ONG.id
    })

    const res = await request(app)
      .delete(`/incidents/${id}`)
      .set('Authorization', ONG.id)
    expect(res.status).toBe(204)
    expect(JSON.stringify(res.body)).toMatch('{}')
  })

  /**
   * Fail cases
   */
  it('should not be able to create a new incident without authorization', async () => {
    const res = await request(app)
      .post('/incidents')
      .send(INCIDENT1)
    expect(res.body).toHaveProperty('message')
    expect(res.status).toBe(401)
  })

  it('should not be able to create a new incident with invalid body', async () => {
    const res = await request(app)
      .post('/incidents')
      .send({})
    expect(res.body).toHaveProperty('message')
    expect(res.body).toHaveProperty('validation')
    expect(res.status).toBe(400)
  })

  it('should not be able to delete a incident without authorization', async () => {
    const [id]: number[] = await connection('incidents').insert({
      ...INCIDENT1,
      ong_id: ONG.id
    })

    const res = await request(app).delete(`/incidents/${id}`)
    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty('message')
  })

  it('should not be able to delete a incident with a different ong id', async () => {
    const [id]: number[] = await connection('incidents').insert({
      ...INCIDENT1,
      ong_id: ONG.id
    })

    const res = await request(app)
      .delete(`/incidents/${id}`)
      .set('Authorization', generateUniqueId())
    expect(res.status).toBe(403)
    expect(res.body).toHaveProperty('message')
  })

  it('should not be able to delete a incident with invalid id', async () => {
    const res = await request(app)
      .delete('/incidents/0')
      .set('authorization', ONG.id)
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('message')
  })
})
