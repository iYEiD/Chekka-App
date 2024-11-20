import {inject, Injectable} from '@angular/core';
import {AccountApiService} from "./account-api.service";
import {SnackbarService} from "../../../../../services/snack-bar/services/snackbar.service";
import {SnackbarTypeEnums} from "../../../../../services/snack-bar/enum/snackbar-type.enums";
import {AuthService} from "../../../authentication/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountApiService = new AccountApiService();
  snackBarService = inject(SnackbarService)
  authService = inject(AuthService)
  constructor() { }

  updateUserDetails(changes: any) {
    this.accountApiService.updateUserDetails(changes).subscribe({
      next: result => {
        // send user details again on successful update to update the user in the auth service
        if (changes.field === "email") {
          this.authService.logout()
        } else {
          this.snackBarService.openSnackBar(SnackbarTypeEnums.SUCCESS, `${changes.field} updated successfully.`)
        }
      },
      error: err => this.snackBarService.openSnackBar(SnackbarTypeEnums.ERROR, `Error updating ${changes.field}.`)
    })
  }
}
