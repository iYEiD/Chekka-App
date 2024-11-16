export interface LoginCredentialsModel {
  email: string;
  password: string;
}

export interface UserSignupInfoViewModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export interface UserSignupInfoDTOModel {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
}

export interface LoginDTOModel {
  tokens: TokenDtoModel
  user: UserDTOModel
}

export interface LoginViewModel {
  tokens: TokenViewModel
  user: UserViewModel
}

export interface TokenViewModel {
  accessToken: string;
  refreshToken: string;
}

export interface TokenDtoModel {
  access_token: string;
  refresh_token: string;
}

export interface UserDTOModel {
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserViewModel {
  firstName: string;
  lastName: string;
  email: string;
}

export interface DecodedTokenDTOModel {
  exp: number
  iss: string
  user_data: DecodedTokenUserInfoDtoModel
}

export interface DecodedTokenUserInfoDtoModel {
  username?: string;
}

export interface ParsedTokenDtoModel {
  exp: number;
  iss: string;
  username?: string;
}
