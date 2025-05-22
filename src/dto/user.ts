export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

export class UserAdd {
  login: string;
  password: string;
  role: Roles;
}

export class UserChange {
  login: string;
  password: string;
  role: Roles;
}
