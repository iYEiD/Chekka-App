import {inject, Injectable, signal} from '@angular/core';
import {AccountApiService} from "./account-api.service";
import {SnackbarService} from "../../../../../services/snack-bar/services/snackbar.service";
import {SnackbarTypeEnums} from "../../../../../services/snack-bar/enum/snackbar-type.enums";
import {AuthService} from "../../../authentication/services/auth.service";
import {UserDTOModel} from "../../../../../models/authentication/interfaces/authentication.models";
import {HelperFunctions} from "../../../../../common/helper-functions";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountApiService = new AccountApiService();
  snackBarService = inject(SnackbarService)
  authService = inject(AuthService)

  constructor() { }

  updateUserDetails(column: string, newValue: string | number, oldValue?: string) {
    this.accountApiService.updateUserDetails(HelperFunctions.fromCamelToSnakeCase(column), newValue, oldValue).subscribe({
      next: result => {
        const updatedUser = { ...this.authService.user(), [column]: newValue };
        this.authService.user.set(updatedUser);
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
}
