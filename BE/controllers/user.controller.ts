import { Request, Response } from 'express';
import { UserRecord } from '../records/user.records';
import { ValidationError } from '../utils/error';
import { generateToken } from '../utils/generateToken';
import { bcryptPassword, checkPassword } from '../utils/hashGen';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const userExists = await UserRecord.getOne(email);

  if (userExists) {
    throw new ValidationError('User already exists');
  }

  const user = new UserRecord({ ...req.body, password: await bcryptPassword(password) });
  await user.insert();
  res.json({ ...user, token: generateToken(user.id) });
};

export const authUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await UserRecord.getOne(email);

  if (user && (await checkPassword(password, user.password))) {
    res.json({ ...user, token: generateToken(user.id) });
  } else {
    throw new ValidationError('password or email is incorrect');
  }
};
