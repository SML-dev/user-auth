import jwt from 'jsonwebtoken';

const secret = 'fbodhfosdfsdccscssggsdgsdgsdgedgeeeewfcwipio';

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  });
};
