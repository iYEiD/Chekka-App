import {inject, Injectable, signal} from '@angular/core';
import {AccountApiService} from "./account-api.service";
import {SnackbarService} from "../../../../../services/snack-bar/services/snackbar.service";
import {SnackbarTypeEnums} from "../../../../../services/snack-bar/enum/snackbar-type.enums";
import {AuthService} from "../../../authentication/services/auth.service";
import {
  UserDTOModel,
  UserViewModel,
  WalletViewModel
} from "../../../../../models/authentication/interfaces/authentication.models";
import {HelperFunctions} from "../../../../../common/helper-functions";
import {AuthenticationMapper} from "../../../../../mappers/authentication/authentication.mapper";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountApiService = new AccountApiService();
  snackBarService = inject(SnackbarService)
  authService = inject(AuthService)

  userInfo = signal<UserViewModel | null>(null)
  userWallet = signal<WalletViewModel | null>(null)

  constructor() { }

  updateUserDetails(column: string, newValue: string | number, oldValue?: string) {
    this.accountApiService.updateUserDetails(HelperFunctions.fromCamelToSnakeCase(column), newValue, oldValue).subscribe({
      next: result => {
        const updatedUser = { ...this.userInfo(), [column]: newValue };
        this.userInfo.set(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser))
        if (column === "email" || oldValue) {
          this.authService.logout()
          this.snackBarService.openSnackBar(SnackbarTypeEnums.SUCCESS, `${HelperFunctions.fromCamelToTitleCase(column)} updated successfully. Please login again with updated credentials.`)
        } else {
          this.snackBarService.openSnackBar(SnackbarTypeEnums.SUCCESS, `${HelperFunctions.fromCamelToTitleCase(column)} updated successfully.`)
        }
      },
      error: err => this.snackBarService.openSnackBar(SnackbarTypeEnums.ERROR, `Error updating ${HelperFunctions.fromCamelToTitleCase(column)}.`)
    })
  }

  getUserDetails() {
    this.accountApiService.getUserDetails().subscribe({
      next: res => {
        this.userInfo.set(AuthenticationMapper.fromUserDTOModelToUserViewModel(res))
      }
    })
  }

  getUserWallet() {
    this.accountApiService.getUserWallet().subscribe({
      next: res => {
        this.userWallet.set(AuthenticationMapper.fromWalletDtoToViewModel(res))
      }
    })
  }
}
