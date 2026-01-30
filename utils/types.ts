export interface User {
  username: string;
  password: string;
}

export interface InvalidUser extends User {
  error: string;
}

export interface UserData {
  validUsers: User[];
  invalidUsers: InvalidUser[];
}
