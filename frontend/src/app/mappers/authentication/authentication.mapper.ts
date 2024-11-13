import {
  DecodedTokenDTOModel, LoginDTOModel, LoginViewModel, ParsedTokenDtoModel,
  TokenDtoModel,
  TokenViewModel, UserDTOModel, UserSignupInfoDTOModel, UserSignupInfoViewModel, UserViewModel
} from "../../models/authentication/interfaces/authentication.models";


export class AuthenticationMapper {
    constructor() {}

    public static fromTokenDTOModelToTokenViewModel(dto: TokenDtoModel): TokenViewModel {
        return {
            accessToken: dto.access_token,
            refreshToken: dto.refresh_token
        }
    }

    public static fromTokenDTOModelToParsedToken(res: DecodedTokenDTOModel): ParsedTokenDtoModel {
        return {
          exp: res.exp,
          iss: res.iss,
          username: res.user_data?.username,
        }
    }

    public static fromLoginDTOModelToViewModel(res: LoginDTOModel): LoginViewModel {
      return {
        tokens: {
          accessToken: res.tokens.access_token,
          refreshToken: res.tokens.refresh_token
        },
        user: this.fromUserDTOModelToUserViewModel(res.user)
      }
    }

  public static fromUserDTOModelToUserViewModel(user: UserDTOModel): UserViewModel {
    return {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
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
}
