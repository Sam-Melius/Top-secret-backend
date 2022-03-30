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
      .send({ email: 'wally@defense.gov', password: 'souvenir', });

    expect(res.body).toEqual({ id: expect.any(String), email: 'wally@defense.gov' });
  });

  it('signs in a user', async () => {
    const user = await UserService.create({
      email: 'wally@defense.gov',
      password: 'souvenir'
    });
    const res = await request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'wally@defense.gov', password: 'souvenir' });

    expect(res.body).toEqual({ user });
  });

  it('logout a user', async () => {
    let user = await UserService.create({
      email: 'wally@defense.gov',
      password: 'souvenir'
    });
    user = await UserService.signIn({
      email: 'wally@defense.gov',
      password: 'souvenir'
    });
    const res = await request(app)
      .delete('/api/v1/auth/sessions').send(user);

    expect(res.body).toEqual({ success: true, message: 'Signed out' });
  });

  it('allows user to see list of secrets', async () => {
    
    const agent = request.agent(app);

    await UserService.create({
      email: 'wally@defense.gov',
      password: 'souvenir'
    });

    await agent.post('/api/v1/auth/signin')
      .send({
        email: 'wally@defense.gov',
        password: 'souvenir'
      });
    
    const res = await agent.post('/api/v1/secrets')
      .send({
        title: 'The Flash',
        description: 'Wally is the best one'
      });
    
    expect(res.body)
      .toEqual({ id: expect.any(String), title: 'The Flash', description: 'Wally is the best one' });

  });

});
