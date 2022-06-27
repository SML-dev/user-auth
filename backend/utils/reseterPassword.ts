import crypto from 'crypto';
import moment from 'moment';
import { UserEntity } from '../types';

export const resetPasswordToken = async (user: UserEntity): Promise<string> => {
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPassword = crypto.createHash('sha512').update(resetToken).digest('hex');
  user.resetPasswordExpires = moment().add(10, 'minutes').format();
  // @ts-ignore
  await user.update();
  return resetToken;
};
