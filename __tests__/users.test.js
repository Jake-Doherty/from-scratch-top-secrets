const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const testUser = {
  firstName: 'Test',
  lastName: 'TestUser',
  email: 'test@test.com',
  password: 'asdfasdf',
};

const userSignIn = {
  email: testUser.email,
  password: testUser.password,
};

describe('user creation, sign in, and sign out routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST /api/v1/users should create a new user', async () => {
    const newUser = await request(app).post('/api/v1/users').send(testUser);
    const { firstName, lastName, email } = testUser;
    expect(newUser.status).toBe(200);
    expect(newUser.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  it('POST /api/v1/users/sessions should log in a user', async () => {
    await request(app).post('/api/v1/users').send(testUser);

    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send(userSignIn);

    expect(res.body.message).toEqual('Signed in successfully!');
  });

  it('DELETE /api/v1/users/sessions should log out a signed in user', async () => {
    await request(app).post('/api/v1/users').send(testUser);
    await request(app).post('/api/v1/users/sessions').send(userSignIn);

    const resp = await request(app).del('/api/v1/users/sessions');

    expect(resp.body.message).toEqual('Signed out successfully!');
  });

  afterAll(() => {
    pool.end();
  });
});
