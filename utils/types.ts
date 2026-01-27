export interface users {
  username: string;
  password: string;
}

export interface invalidUsers extends users {
  error: string;
}

export interface userData {
  valid: users[];
  invalid: invalidUsers[];
}
