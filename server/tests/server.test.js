const request = require('supertest');
const { default: mongoose } = require("mongoose");
const User = require('../models/users');
const { verifyPassword } = require("../utils/password");

jest.mock("../utils/password", () => ({
  verifyPassword: jest.fn()
}));
jest.mock('../models/users');
let server;
describe('Session management tests', () => {
  beforeEach(async () => {
    server = require('../server');
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  it('POST /login should return 200 if the user is valid and has a token and session', async () => {
    // Get CSRF token
    const respToken = await request(server).get('/auth/csrf-token');

    const token = respToken.body.csrfToken;

    // Extract the session ID from the response headers
    let connectSidValue = null;
    respToken.headers['set-cookie'].forEach(cookie => {
      if (cookie.includes('connect.sid')) {
        connectSidValue = cookie.split('=')[1].split(';')[0];
      }
    });

    // Ensure the CSRF token was obtained successfully
    expect(respToken.status).toBe(200);

    const fakeUser = { username: 'user1', contactemail: 'test@email.com', password: 'testpassword' };
    User.findOne = jest.fn().mockResolvedValueOnce(fakeUser);
    verifyPassword.mockResolvedValue(true);
    const loginResponse =  await request(server)
        .post('/auth/login')
        .send(fakeUser)
        .set('x-csrf-token', token)
        .set('Cookie', [`connect.sid=${connectSidValue}`]);
    expect(loginResponse.status).toBe(200);

    // Assert that the response body contains the expected user object
    expect(loginResponse.body.user.contactemail).toBe(fakeUser.contactemail);
    expect(loginResponse.body.user.password).toBe(fakeUser.password);
  });


  it('POST /login must return 403 forbidden if the user is valid but has no token', async () => {
    // Get CSRF token
    const respToken = await request(server).get('/auth/csrf-token');

    // Extract the session ID from the response headers
    let connectSidValue = null;
    respToken.headers['set-cookie'].forEach(cookie => {
      if (cookie.includes('connect.sid')) {
        connectSidValue = cookie.split('=')[1].split(';')[0];
      }
    });

    // Ensure the CSRF token was obtained successfully
    expect(respToken.status).toBe(200);

    const fakeUser = { username: 'user1', password: 'password1' };
    const loginResponse = await request(server)
      .post('/auth/login')
      .send({ fakeUser })
      .set('Cookie', [`connect.sid=${connectSidValue}`]);
      expect(loginResponse.status).toBe(403);
  });

  it('POST /login must return 403 forbidden if the user is valid but has no session', async () => {
    // Get CSRF token
    const respToken = await request(server)
    .get('/auth/csrf-token');

    const token = respToken.body.csrfToken;

    // Ensure the CSRF token was obtained successfully
    expect(respToken.status).toBe(200);

    const fakeUser = { username: 'user1', password: 'password1' };
    const respLogin = await request(server)
      .post('/auth/login')
      .send(fakeUser)
      .set('x-csrf-token', token)

      expect(respLogin.status).toBe(403);
  });

  it('/logout should successfully destroy the session', async () => {
    // Get CSRF token
    const respToken = await request(server).get('/auth/csrf-token');

    let connectSidValue = null;
    respToken.headers['set-cookie'].forEach(cookie => {
      if (cookie.includes('connect.sid')) {
        connectSidValue = cookie.split('=')[1].split(';')[0];
      }
    });
  
    const token = respToken.body.csrfToken;
  
    // Ensure the CSRF token was obtained successfully
    expect(respToken.status).toBe(200);
  
    // Login to establish a session
    const fakeUser = { username: 'user1', contactemail: 'test@email.com', password: 'testpassword' };
    User.create.mockResolvedValueOnce(fakeUser);
    User.findOne = jest.fn().mockResolvedValueOnce(fakeUser);
    verifyPassword.mockResolvedValue(true);
    const loginResponse =  await request(server)
        .post('/auth/login')
        .send(fakeUser)
        .set('x-csrf-token', token)
        .set('Cookie', [`connect.sid=${connectSidValue}`]);
  
    // Ensure login was successful
    expect(loginResponse.status).toBe(200);
  
    // Extract session cookie from login response
  
    // Perform logout using the session cookie
    const logoutResponse = await request(server)
      .post('/auth/logout')
      .set('Cookie', [`connect.sid=${connectSidValue}`])
      .set('x-csrf-token', token);
  
    // Ensure the session is destroyed and the response indicates success
    expect(logoutResponse.status).toBe(200);
    expect(logoutResponse.body.success).toBe(true);
  });

  it('/csrf-token should successfully retrieve the CSRF token', async () => {
    // Get CSRF token
    const respToken = await request(server)
    .get('/auth/csrf-token');

    const setCookieHeader = respToken.headers['set-cookie'][0];
    sessionId = setCookieHeader.split(';')[0].split('=')[1];

    const token = respToken.body.csrfToken;

    // Ensure the CSRF token was obtained successfully
    expect(respToken.status).toBe(200);
    expect(respToken.body.csrfToken).toBe(token);
  });
});