// Unit tests for utils/password.js
const bcrypt = require('bcrypt');
const { hashPassword, verifyPassword } = require('../utils/password');

jest.mock('bcrypt');

describe('password util module', () => {

  test('hashPassword should hash the password', async () => {
    const password = 'password123';
    const hashedPassword = 'hashedPassword123';
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue(hashedPassword);

    const result = await hashPassword(password);

    expect(result).toBe(hashedPassword);
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 'salt');
  });

  test('should handle hashPassword errors', async () => {
    const password = 'password123';
    const error = new Error('hashing error');
    bcrypt.genSalt.mockRejectedValue(error);

    await expect(hashPassword(password)).rejects.toThrowError(
      'hashing error'
    );
  });

  test('verifyPassword should verify the password', async () => {
    const password = 'password123';
    const hashedPassword = 'hashedPassword123';
    bcrypt.compare.mockResolvedValue(true);

    const result = await verifyPassword(password, hashedPassword);

    expect(result).toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
  });

  test('should handle verifyPassword errors', async () => {
    const password = 'password123';
    const error = new Error('verification error');
    bcrypt.compare.mockRejectedValue(error);

    await expect(verifyPassword(password)).rejects.toThrowError(
      'verification error'
    );
  });
});