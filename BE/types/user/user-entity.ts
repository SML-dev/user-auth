export interface NewUserEntity extends Omit<UserEntity, 'id'> {
  id?: string;
}

export interface UserEntity {
  id?: string;
  name: string;
  email: string;
  password: string;
}
