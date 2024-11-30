import { NextRequest } from 'next/server'
import POST  from '@/pages/api/auth'

describe('Authentication API', () => {
  it('returns a token for valid credentials', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth', {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@shopyangu.com', password: 'admin123' }),
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('token')
  })

  it('returns an error for invalid credentials', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth', {
      method: 'POST',
      body: JSON.stringify({ email: 'wrong@email.com', password: 'wrongpassword' }),
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data).toHaveProperty('error', 'Invalid credentials')
  })
})

