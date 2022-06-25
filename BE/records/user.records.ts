import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { pool } from '../utils/db';
import { NewUserEntity, UserEntity } from '../types';
import { ValidationError } from '../utils/error';

type UserRecordResults = [UserEntity[], FieldPacket[]];

export class UserRecord implements UserEntity {
  id?: string;
  name: string;
  email: string;
  password: string;

  constructor(obj: NewUserEntity) {
    if (!obj.name || obj.name.length > 20 || obj.name.length < 4) {
      throw new ValidationError(
        'User name cannot be empty and must be between 4 and 20 characters',
      );
    }

    if (!obj.email || obj.email.length > 30 || obj.email.length < 6 || !obj.email.includes('@')) {
      throw new ValidationError(
        'Email cannot be empty and must be between 6 and 30 characters and includes @',
      );
    }

    if (!obj.password || obj.password.length > 72 || obj.password.length < 6) {
      throw new ValidationError(
        'Password cannot be empty and must be between 6 and 100 characters',
      );
    }

    this.id = obj.id ?? uuid();
    this.name = obj.name;
    this.email = obj.email;
    this.password = obj.password;
  }

  static async getOne(email: string): Promise<UserRecord> {
    const [results] = (await pool.execute('SELECT * FROM users WHERE `email`= :email', {
      email,
    })) as UserRecordResults;
    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  async insert(): Promise<string> {
    await pool.execute(
      'INSERT INTO `users`(`id`,`name`,`email`,`password`) VALUES(:id,:name,:email,:password) ',
      {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
      },
    );

    return this.id;
  }
}
