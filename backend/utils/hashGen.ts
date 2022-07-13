import * as bcrypt from 'bcrypt';

export const bcryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const checkPassword = async (
  enteredPassword: string,
  password: string,
): Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, password);
};
