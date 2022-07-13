import {UserRecord} from './user.records';

/** tested object from DB
 id: '47bc410e-a1a2-4145-a3d9-83cc8325aeed',
  name: 'test',
  email: 'test@test.pl',
  password: '$2b$10$.deYZs17sCWmzOjGn6BqqerVkKF7FhHvfxTtOqbYiFdw1i2zTb/oG',
  resetPassword: null,
  resetPasswordExpires: null

 */

test('UserRecord returns data from database for one entry', async () => {
  const user = await UserRecord.getOne('test@test.pl');
  expect(user).toBeDefined();
  expect(user.name).toBe('test');
  expect(user.email).toBe('test@test.pl');
  expect(user.password).toBe('$2b$10$.deYZs17sCWmzOjGn6BqqerVkKF7FhHvfxTtOqbYiFdw1i2zTb/oG');
  expect(user.resetPassword).toBeNull();
  expect(user.resetPasswordExpires).toBeNull();
});

test('AdRecord returns null from database for unexisting entry', async () => {
  const user = await UserRecord.getOne('testowy@test.pl');
  expect(user).toBeNull();
});
