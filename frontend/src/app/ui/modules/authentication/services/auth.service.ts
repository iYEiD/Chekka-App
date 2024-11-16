import {inject, Injectable, signal} from '@angular/core';
import {AuthApiService} from "./auth-api.service";
import {SnackbarService} from "../../../../services/snack-bar/services/snackbar.service";
import {SnackbarTypeEnums} from "../../../../services/snack-bar/enum/snackbar-type.enums";
import {JwtService} from "../../../../services/authentication/jwt.service";
import {Router} from "@angular/router";
import {
  LoginCredentialsModel,
  UserSignupInfoViewModel,
  UserViewModel
} from "../../../../models/authentication/interfaces/authentication.models";
import {AuthenticationMapper} from "../../../../mappers/authentication/authentication.mapper";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authApiService = inject(AuthApiService);
  snackBarService = inject(SnackbarService);
  jwtService = inject(JwtService);
  router = inject(Router)

  isLoggedIn = signal<boolean>(false)
  user = signal<UserViewModel | null>(null)

  constructor() { }

  signUp(signupUserInfo: UserSignupInfoViewModel) {
    this.authApiService.signup(AuthenticationMapper.fromUserSignupInfoViewModelToDTOModel(signupUserInfo)).subscribe({
      next: (res) => {
        this.router.navigate(['/auth/login']);
        this.snackBarService.openSnackBar(SnackbarTypeEnums.SUCCESS, 'Successfully signed up! Please log in')
      },
      error: (error) => {
        this.snackBarService.openSnackBar(SnackbarTypeEnums.ERROR, error.error.message)
      }
    })
  }

  login(loginCredentials: LoginCredentialsModel) {
    this.authApiService.login(loginCredentials).subscribe({
      next: (res) => {
        this.isLoggedIn.set(true);
        let tokens = AuthenticationMapper.fromTokenDTOModelToTokenViewModel(res.tokens);
        this.jwtService.setTokens(tokens.accessToken, tokens.refreshToken);
        this.user.set(AuthenticationMapper.fromUserDTOModelToUserViewModel(res.user));
        this.router.navigateByUrl('/app').then(() => {});
      },
      error: (error) => {
        this.snackBarService.openSnackBar(SnackbarTypeEnums.ERROR, 'Incorrect username and/or password')
      }
    })
  }

  logout() {
    this.isLoggedIn.set(false);
    this.user.set(null)
    this.jwtService.clearTokens();
    this.router.navigateByUrl('auth').then(() => {});
  }

  refreshToken() {
    const refreshToken = this.jwtService.getRefreshToken();
    return this.authApiService.refreshToken(refreshToken!)
  }
}
