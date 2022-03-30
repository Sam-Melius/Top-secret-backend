const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('Top-secret-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'Wally', password: 'souvenir', });

    expect(res.body).toEqual({ id: expect.any(String), email: 'Wally' });
  });

  it('signs in a user', async () => {
    const user = await UserService.create({
      email: 'Wally',
      password: 'souvenir'
    });
    const res = await request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'Wally', password: 'souvenir' });

    expect(res.body).toEqual({ user });
  });

  it('logout a user', async () => {
    let user = await UserService.create({
      email: 'Wally',
      password: 'souvenir'
    });
    user = await UserService.signIn({
      email: 'Wally',
      password: 'souvenir'
    });
    const res = await request(app)
      .delete('/api/v1/auth/sessions').send(user);

    expect(res.body).toEqual({ success: true, message: 'Signed out' });
  });

});
