export type LoginModel = {
  username?: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  username?: string;
  email: string;
  password: string;
};

export const makeLoginRequest = (data: LoginModel): LoginRequest => ({
  username: data?.username,
  email: data.email,
  password: data.password,
});

export type ResetPasswordRequest = {
  email: string;
  password: string;
  token: string;
};

export type VerifyEmailModel = {
  email: string;
  token: string;
};
