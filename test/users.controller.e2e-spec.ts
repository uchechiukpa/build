import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersModule } from '../src/users/users.module';

describe('CreateUser (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST (create-users)', () => {
    return request(app.getHttpServer())
      .post('create-users')
      .send({
        email: 'test@mail.com',
        username: 'test',
        password: 'password',
        displayPicture: 'url',
        bio: 'Bio',
      })
      .expect(201);
  });

  it('should fail if email is duplicated', () => {
    return request(app.getHttpServer())
      .post('create-users')
      .send({
        email: 'test@mail.com',
        username:'test',
        password: 'password',
        displayPicture: 'url',
        bio: 'Bio',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual('Client with this email exists');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});