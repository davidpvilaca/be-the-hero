import * as request from 'supertest'
import app from '../src/main'

describe('General routes', () => {
  it('/ping should be return "pong"', async () => {
    const res = await request(app).get('/ping')
    expect(res.status).toBe(200)
    expect(res.body).toBe('Pong!')
  })

  it('404', async () => {
    const res = await request(app).get('/404')
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('message')
  })

  it('500', async () => {
    const res = await request(app).get('/500')
    expect(res.status).toBe(500)
    expect(res.body).toHaveProperty('message')
  })
})
