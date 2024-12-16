import {
  DecodedTokenDTOModel,
  LoginDTOModel,
  LoginViewModel,
  ParsedTokenDtoModel,
  UserDTOModel,
  UserSignupInfoDTOModel,
  UserSignupInfoViewModel,
  UserViewModel,
  WalletDtoModel, WalletTransactionDtoModel, WalletTransactionViewModel, WalletViewModel
} from "../../models/authentication/interfaces/authentication.models";


export class AuthenticationMapper {
    constructor() {}

    public static fromTokenDTOModelToParsedToken(res: DecodedTokenDTOModel): ParsedTokenDtoModel {
        return {
          exp: res.exp,
          iss: res.iss,
          username: res.user_data?.username,
        }
    }

    public static fromLoginDTOModelToViewModel(res: LoginDTOModel): LoginViewModel {
      return {
        accessToken: res.access_token,
        user: this.fromUserDTOModelToUserViewModel(res.user)
      }
    }

  public static fromUserDTOModelToUserViewModel(user: UserDTOModel): UserViewModel {
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phoneNumber: user.phone_number,
    }
  }
  public static fromUserSignupInfoViewModelToDTOModel(user: UserSignupInfoViewModel): UserSignupInfoDTOModel {
      return {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        phone_number: user.phoneNumber,
        password_confirmation: user.confirmPassword
      }
  }

  public static fromWalletDtoToViewModel(wallet: WalletDtoModel): WalletViewModel {
      return {
        totalFunds: wallet.total_funds,
        transactionHistory: this.fromWalletTransactionsDtoToViewModel(wallet.transaction_history)
      }
  }

  public static fromWalletTransactionsDtoToViewModel(transactions: WalletTransactionDtoModel[]): WalletTransactionViewModel[] {
      return transactions.map(transaction => {
        return {
          secondUserFirstName: transaction.second_user_firstName,
          secondUserLastName: transaction.second_user_lastName,
          amount: transaction.amount,
          type: transaction.type,
        }
      })
  }
}
