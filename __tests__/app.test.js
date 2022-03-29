const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
      .send({ username: 'Wally West', password: 'souvenir', });

    expect(res.body).toEqual({ id: expect.any(String), username: 'Wally West' });
  });

});
