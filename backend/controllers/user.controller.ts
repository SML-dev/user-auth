import { Request, Response } from 'express';
import { UserRecord } from '../records/user.records';
import { ValidationError } from '../utils/error';
import { authToken } from '../utils/authToken';
import { bcryptPassword, checkPassword } from '../utils/hashGen';
import { sendEmail } from '../utils/sendEmail';
import { resetPasswordToken } from '../utils/reseterPassword';
import * as crypto from 'crypto';
import moment from 'moment';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const userExists = await UserRecord.getOne(email);
  if (userExists) {
    throw new ValidationError('User already exists');
  }
  if (!password || password.length > 50 || password.length < 6) {
    throw new ValidationError('Password cannot be empty and must be between 6 and 50 characters');
  }

  try {
    const user = new UserRecord({ ...req.body, password: await bcryptPassword(password) });
    await user.insert();
    const token = authToken(user.id);
    res
      .cookie('access_token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ msg: 'Registration successful' });
  } catch (err) {
    console.log(err.message);
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await UserRecord.getOne(email);
    const token = authToken(user.id);
    if (user && (await checkPassword(password, user.password))) {
      res
        .cookie('access_token', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ token });
    } else {
      throw new ValidationError('password or email is incorrect');
    }
  } catch (err) {
    res.status(404).json({ msg: `${err.message}` });
  }
};

export const getPrivateData = async (req: Request, res: Response): Promise<void> => {
  res.send('You have access to private data');
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  const user = await UserRecord.getOne(email);

  if (!user) {
    throw new ValidationError('Email is incorrect');
  }

  const resetToken = await resetPasswordToken(user);
  const resetUrl = `http://localhost:3000/password-reset/${resetToken}`;
  const msg = `<h1>You have requested a password reset</h1>
  <p> please click link</p>
  <a href=${resetUrl} clicktracking="off">${resetUrl}</a>
  `;
  try {
    await sendEmail({
      to: process.env.EMAIL_ADDRESS_TEST,
      subject: 'password reset',
      text: msg,
    });
  } catch (error) {
    user.resetPassword = '';
    user.resetPasswordExpires = '';
    throw new ValidationError('Error occurred while sending mail');
  }
  res.json({ msg: 'Sending email reset password' });
};
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const resetPassword = crypto.createHash('sha512').update(req.params.token).digest('hex');
  try {
    const user = await UserRecord.getOneByResetPassword(resetPassword, moment().format());
    if (!user) {
      throw new ValidationError('invalid Reset Token');
    }
    user.password = await bcryptPassword(req.body.password);
    await user.update();
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
