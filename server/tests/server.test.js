const request = require('supertest');
const { default: mongoose } = require("mongoose");

let server;
describe('Session management tests', () => {
  beforeEach(() => {
    server = require('../server');
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  // TODO: Fix -- returns 403 error
  it('POST /login should return 200 if the user is valid and has a token and session', async () => {
    // Get CSRF token
    const respToken = await request(server)
    .get('/auth/csrf-token');

    const token = respToken.body.csrfToken;

    // Extract the session ID from the response headers
    const setCookieHeader = respToken.headers['set-cookie'][0];
    sessionId = setCookieHeader.split(';')[0].split('=')[1];

    // Ensure the CSRF token was obtained successfully
    expect(respToken.status).toBe(200);

    const fakeUser = { username: 'user1', password: 'password1' };
    const loginResponse = await request(server)
      .post('/auth/login')
      .send({ fakeUser })
      .set('x-csrf-token', token)
      .set('Cookie', `session_id=${sessionId}`);

      expect(loginResponse.status).toBe(200);
  });

  it('POST /login must return 403 forbidden if the user is valid but has no token', async () => {
    // Get CSRF token
    const respToken = await request(server)
    .get('/auth/csrf-token');

    // Extract the session ID from the response headers
    const setCookieHeader = respToken.headers['set-cookie'][0];
    sessionId = setCookieHeader.split(';')[0].split('=')[1];

    // Ensure the CSRF token was obtained successfully
    expect(respToken.status).toBe(200);

    const fakeUser = { username: 'user1', password: 'password1' };
    const loginResponse = await request(server)
      .post('/auth/login')
      .send({ fakeUser })
      .set('Cookie', `session_id=${sessionId}`);
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

  // TODO: Fix -- returns 403 error
  it('/logout should successfully destroy the session', async () => {
    // Get CSRF token
    const respToken = await request(server)
      .get('/auth/csrf-token');

    const setCookieHeader = respToken.headers['set-cookie'][0];
    sessionId = setCookieHeader.split(';')[0].split('=')[1];
  
    const token = respToken.body.csrfToken;
  
    // Ensure the CSRF token was obtained successfully
    expect(respToken.status).toBe(200);
  
    // Login to establish a session
    const loginResponse = await request(server)
      .post('/auth/login')
      .send({ username: 'user1', password: 'password1' })
      .set('x-csrf-token', token)
      .set('Cookie', `session_id=${sessionId}`);
  
    // Ensure login was successful
    expect(loginResponse.status).toBe(200);
  
    // Extract session cookie from login response
    const sessionCookie = loginResponse.headers['set-cookie'][0];
  
    // Perform logout using the session cookie
    const logoutResponse = await request(server)
      .post('/auth/logout')
      .set('Cookie', sessionCookie)
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