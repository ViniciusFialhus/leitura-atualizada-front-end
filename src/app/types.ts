export type CreateUserType = {
  name: string;
  email: string;
  isAdm: boolean;
  password: string;
  username: string;
};

export type AuthLoginType = {
  email: string;
  password: string;
};
