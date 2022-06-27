import { Request, Response } from 'express';
import { UserRecord } from '../records/user.records';
import { ValidationError } from '../utils/error';
import { authToken } from '../utils/authToken';
import { bcryptPassword, checkPassword } from '../utils/hashGen';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const userExists = await UserRecord.getOne(email);
  if (userExists) {
    throw new ValidationError('User already exists');
  }
  if (!password || password.length > 50 || password.length < 6) {
    throw new ValidationError('Password cannot be empty and must be between 6 and 50 characters');
  }

  const user = new UserRecord({ ...req.body, password: await bcryptPassword(password) });
  await user.insert();
  const token = authToken(user.id);
  res
    .cookie('access_token', token, {
      httpOnly: true,
    })
    .status(201)
    .json({ token });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await UserRecord.getOne(email);
  const token = authToken(user.id);
  if (user && (await checkPassword(password, user.password))) {
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json({ token });
  } else {
    throw new ValidationError('password or email is incorrect');
  }
};

export const getPrivateData = async (req: Request, res: Response): Promise<void> => {
  res.send('You have access to private data');
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  res.send('forgotPassword');
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  res.send('resetPassword');
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('access_token').status(200).json({ message: 'Successfully logged out 😏 🍀' });
};
