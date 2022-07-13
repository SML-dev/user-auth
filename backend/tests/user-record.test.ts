import { UserRecord } from '../records/user.records';

const generateStringLength = (count: number): string => {
  let char = '';
  while (char.length < count) {
    char += '@';
  }
  return char;
};

const defaultObject = {
  name: 'Maniek',
  email: 'maniek@gmail.com',
  password: '123456',
  resetPassword:
    'j705fff152fa8f3065c7395b4d67cdf9bdbfabc56818bdab3dc610019169ba411545695c877bc45f99ce399235b8783e58def76c721cd0d2',
  resetPasswordExpires: '2022-07-11T20:42:23+02:00',
};

test('Can build UserRecord', () => {
  const user = new UserRecord(defaultObject);

  expect(user.name).toBe('Maniek');
  expect(user.email).toBe('maniek@gmail.com');
  expect(user.password).toBe('123456');
  expect(user.resetPassword).toBe(
    'j705fff152fa8f3065c7395b4d67cdf9bdbfabc56818bdab3dc610019169ba411545695c877bc45f99ce399235b8783e58def76c721cd0d2',
  );
  expect(user.resetPasswordExpires).toBe('2022-07-11T20:42:23+02:00');
});

test('validate invalid name', () => {
  expect(() => {
    new UserRecord({
      ...defaultObject,
      name: 'kas',
    });
  }).toThrow('User name cannot be empty and must be between 4 and 20 characters');
});

test('validate invalid name', () => {
  expect(() => {
    new UserRecord({
      ...defaultObject,
      name: generateStringLength(21),
    });
  }).toThrow('User name cannot be empty and must be between 4 and 20 characters');
});

test('validate invalid email', () => {
  expect(() => {
    new UserRecord({
      ...defaultObject,
      email: 'tysiek.wp.pl',
    });
  }).toThrow('Email cannot be empty and must be between 6 and 30 characters and includes @');
});

test('validate invalid email', () => {
  expect(() => {
    new UserRecord({
      ...defaultObject,
      email: 'a@.pl',
    });
  }).toThrow('Email cannot be empty and must be between 6 and 30 characters and includes @');
});

test('validate invalid email', () => {
  expect(() => {
    new UserRecord({
      ...defaultObject,
      email: generateStringLength(31),
    });
  }).toThrow('Email cannot be empty and must be between 6 and 30 characters and includes @');
});
