import { TokenDTOModel, ParsedTokenDtoModel } from "src/app/core/models/interfaces/parsed-token.models";
import { TokenDtoModel, TokenViewModel } from "src/app/core/models/interfaces/token-response";
import {LoginDTOModel, LoginViewModel} from "../models/interfaces/authentication.models";
import {UserMapper} from "../../users/mapper/users.mapper";

export class AuthenticationMapper {
    constructor() {}

    public static fromTokenDTOModelToTokenViewModel(dto: TokenDtoModel): TokenViewModel {
        return {
            accessToken: dto.access_token,
            refreshToken: dto.refresh_token
        }
    }

    public static fromTokenDTOModelToParsedToken(res: TokenDTOModel): ParsedTokenDtoModel {
        return {
          exp: res.exp,
          iss: res.iss,
          username: res.user_data?.username,
          roles: res.user_data?.roles.map(role => role.role_name)
        }
    }

    public static fromLoginDTOModelToViewModel(res: LoginDTOModel): LoginViewModel {
      return {
        tokens: {
          accessToken: res.tokens.access_token,
          refreshToken: res.tokens.refresh_token
        },
        user: UserMapper.fromUserDTOModelToUserViewModel(res.user)
      }
  }
}
