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

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should create a new user', async () => {
    const newUser = await request(app).post('/app/v1/users').send(testUser);

    const { firstName, lastName, email } = testUser;

    expect(newUser.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
