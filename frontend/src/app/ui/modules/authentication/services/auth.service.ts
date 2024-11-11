import {inject, Injectable} from '@angular/core';
import {AuthApiService} from "./auth-api.service";
import {SnackbarService} from "../../../../common/services/snack-bar/services/snackbar.service";
import {SnackbarTypeEnums} from "../../../../common/services/snack-bar/enum/snackbar-type.enums";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authApiService = inject(AuthApiService);
  snackBarService = inject(SnackbarService);

  constructor() { }

  signUp(signupUserInfo: any) {
    this.authApiService.signup(signupUserInfo).subscribe({
      next: (res) => {
        this.snackBarService.openSnackBar(SnackbarTypeEnums.SUCCESS, 'Successfully signed up! Please log in')
      },
      error: (error) => {
        this.snackBarService.openSnackBar(SnackbarTypeEnums.ERROR, 'Failed to register account')
      }
    })
  }
}
