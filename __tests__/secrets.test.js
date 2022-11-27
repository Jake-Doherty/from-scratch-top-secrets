const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService.js');

const testUser = {
  firstName: 'Test',
  lastName: 'TestUser',
  email: 'test@test.com',
  password: 'asdfasdf',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? testUser.password;

  const agent = request.agent(app);

  const user = await UserService.create({ ...testUser, ...userProps });

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /api/v1/secrets should return a list of secrets', async () => {
    const [agent] = await registerAndLogin();

    const resp = await agent.get('/api/v1/secrets');

    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "created_at": "6/7/2022",
          "description": "venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris",
          "id": "1",
          "title": "at velit vivamus vel nulla eget eros",
        },
        Object {
          "created_at": "7/2/2022",
          "description": "donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices",
          "id": "2",
          "title": "elit sodales scelerisque mauris sit amet eros",
        },
        Object {
          "created_at": "10/9/2022",
          "description": "justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit",
          "id": "3",
          "title": "sagittis dui vel",
        },
        Object {
          "created_at": "11/9/2022",
          "description": "pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus",
          "id": "4",
          "title": "quis tortor id",
        },
        Object {
          "created_at": "4/17/2022",
          "description": "sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at",
          "id": "5",
          "title": "odio donec",
        },
        Object {
          "created_at": "3/10/2022",
          "description": "potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis",
          "id": "6",
          "title": "risus dapibus augue vel accumsan tellus nisi eu orci mauris",
        },
        Object {
          "created_at": "4/24/2022",
          "description": "amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel",
          "id": "7",
          "title": "a pede posuere nonummy integer non velit donec",
        },
        Object {
          "created_at": "11/5/2022",
          "description": "eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl",
          "id": "8",
          "title": "diam vitae quam suspendisse potenti nullam porttitor lacus at",
        },
        Object {
          "created_at": "7/24/2022",
          "description": "curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus",
          "id": "9",
          "title": "ut nulla sed accumsan felis ut at",
        },
        Object {
          "created_at": "11/5/2022",
          "description": "sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel",
          "id": "10",
          "title": "morbi quis tortor id nulla ultrices aliquet maecenas",
        },
      ]
    `);
  });

  it('POST /api/v1/secrets should post a new secret to the db', async () => {
    const [agent] = await registerAndLogin();

    const resp = await agent.post('/api/v1/secrets').send({
      title: 'auctor gravida sem praesent',
      description:
        'consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac',
      created_at: '1/11/2022',
    });
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
          Object {
            "created_at": "1/11/2022",
            "description": "consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac",
            "id": "11",
            "title": "auctor gravida sem praesent",
          }
      `);
  });

  afterAll(() => {
    pool.end();
  });
});
