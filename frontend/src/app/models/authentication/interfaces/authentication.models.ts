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
  access_token: string
  user: UserDTOModel
}

export interface LoginViewModel {
  accessToken: string
  user: UserViewModel
}

export interface UserDTOModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface UserViewModel {
  id?: number
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
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

export interface WalletDtoModel {
  total_funds: number;
  transaction_history: WalletTransactionDtoModel[]
}

export interface WalletTransactionDtoModel {
  second_user_firstName: string;
  second_user_lastName: string;
  amount: number;
  type: string
}

export interface WalletViewModel {
  totalFunds: number;
  transactionHistory: WalletTransactionViewModel[]
}

export interface WalletTransactionViewModel {
  secondUserFirstName: string;
  secondUserLastName: string;
  amount: number;
  type: string
}
