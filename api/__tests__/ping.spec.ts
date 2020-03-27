import * as request from 'supertest'
import app from '../src/main'

describe('INCIDENT', () => {
  it('should be return "pong"', async () => {
    const res = await request(app).get('/ping')
    expect(res.status).toBe(200)
    expect(res.body).toBe('Pong!')
  })
})
