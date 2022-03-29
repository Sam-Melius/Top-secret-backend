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
      .send({ username: 'Wally', password: 'souvenir', });

    expect(res.body).toEqual({ id: expect.any(String), username: 'Wally' });
  });

  it('signs in a user', async () => {
    const user = await UserService.create({
      username: 'Wally',
      password: 'souvenir'
    });
    const res = await request(app)
      .post('/api/v1/auth/signin')
      .send({ username: 'Wally', password: 'souvenir' });

    expect(res.body).toEqual({ user });
  });

});
