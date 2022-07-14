import * as crypto from 'crypto';
import { Request, Response } from 'express';
import moment from 'moment';
import { UsersRecord } from '../records/users.record';
import { authToken } from '../utils/authToken';
import { NotFoundError, ValidationError } from '../utils/error';
import { bcryptPassword, checkPassword } from '../utils/hashGen';
import { resetPasswordToken } from '../utils/reseterPassword';
import { sendEmail } from '../utils/sendEmail';

export interface RequestWithUserId extends Request {
  userId?: string;
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const userExists = await UsersRecord.getOne(email);

  if (userExists) {
    res.status(409).json({ msg: 'user already exists' });
  }

  if (!password || password.length > 50 || password.length < 6) {
    throw new ValidationError('Password cannot be empty and must be between 6 and 50 characters');
  }

  try {
    const user = new UsersRecord({ ...req.body, password: await bcryptPassword(password) });
    await user.insert();
    res.status(201).json({ msg: 'Registration successful' });
  } catch (err) {
    console.log(err.message);
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await UsersRecord.getOne(email);
    if (!user) {
      throw new NotFoundError('Page not found');
    }
    const token = authToken(user.id);
    if (req.cookies.access_token) {
      req.cookies.access_token = '';
    }
    if (user && (await checkPassword(password, user.password))) {
      res
        .cookie('access_token', token, {
          httpOnly: true,
          maxAge: Number(moment().add(30, 'seconds')),
        })
        .json({ token, msg: `Hello ${user.name}` });
    } else {
      throw new ValidationError('Error occurred');
    }
  } catch (err) {
    throw new NotFoundError('Password is invalid');
  }
};

export const getPrivateData = async (req: RequestWithUserId, res: Response): Promise<void> => {
  const user = await UsersRecord.getOneById(req.userId);
  res.json({ ...user });
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  const user = await UsersRecord.getOne(email);

  if (!user) {
    throw new NotFoundError('Sorry We couldnt find Your email');
  }

  const resetToken = await resetPasswordToken(user);
  const resetUrl = `http://localhost:3000/password-reset/${resetToken}`;
  const msg = `<h1>You have requested a password reset</h1>
  <p> please click link</p>
  <a href=${resetUrl} clicktracking="off">${resetUrl}</a>
  `;
  try {
    await sendEmail({
      to: user.email,
      subject: 'password reset',
      text: msg,
    });
  } catch (error) {
    user.resetPassword = '';
    user.resetPasswordExpires = '';
    throw new ValidationError('Error occurred while sending mail');
  }
  res.json({ msg: 'Sending email reset password', resetToken });
};
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const resetPassword = crypto.createHash('sha512').update(req.params.token).digest('hex');
  try {
    const user = await UsersRecord.getOneByResetPassword(resetPassword, moment().format());
    if (!user) {
      throw new NotFoundError('Invalid token');
    }
    user.password = await bcryptPassword(req.body.password);
    user.resetPassword = '';
    user.resetPasswordExpires = '';
    await user.update();
    res.json({ msg: 'reset password successfully' });
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('access_token').json({ msg: 'Successfully logged out' });
};
