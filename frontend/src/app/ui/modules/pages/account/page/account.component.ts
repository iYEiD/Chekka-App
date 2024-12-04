import {Component, computed, inject, signal} from '@angular/core';
import {AuthService} from "../../../authentication/services/auth.service";
import {UserViewModel} from "../../../../../models/authentication/interfaces/authentication.models";
import {SnackbarService} from "../../../../../services/snack-bar/services/snackbar.service";
import {SnackbarTypeEnums} from "../../../../../services/snack-bar/enum/snackbar-type.enums";
import {AccountService} from "../services/account.service";
import {HelperFunctions} from "../../../../../common/helper-functions";
import {MainService} from "../../../main/services/main.service";

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  authService = inject(AuthService);
  snackbarService = inject(SnackbarService);
  accountService = inject(AccountService);
  mainService = inject(MainService)

  userDetails = computed(() => {
    const user = this.authService.user();

    if (!user) {
      return [];
    }

    return Object.keys(user)
      .filter(key => key !== 'id')
      .map(key => ({
        field: key,
        value: user[key as keyof UserViewModel],
      }));
  });

  editingField = signal<string | null>(null);

  userDetailsWithEditing = computed(() => {
    const details = this.userDetails();
    const currentEditingField = this.editingField();

    const detailsWithPassword = [
      ...details,
      {
        field: 'password',
        value: '',
        isBeingEdited: currentEditingField === 'password'
      }
    ];

    // Map details and update the `isBeingEdited` flag for each field
    return detailsWithPassword.map(detail => ({
      ...detail,
      isBeingEdited: detail.field === currentEditingField
    }));
  });

  oldPassword = signal<string | null>(null)
  newPassword = signal<string | null>(null)

  ngOnInit() {
    this.mainService.changeNavbarStatus()
  }

  toggleIsBeingEdited(field: string) {
    const currentEditingField = this.editingField();

    if (currentEditingField === field) {
      this.editingField.set(null);
    } else {
      this.editingField.set(field);
    }
  }

  updateDetails() {
    if (this.editingField() !== 'password') {
      let originalValue = this.userDetails().filter(detail => detail.field === this.editingField());
      let newValue = this.userDetailsWithEditing().filter(detail => detail.field === this.editingField());
      if (!this.columnValueValidator(this.editingField()!, newValue[0].value)) {
        this.snackbarService.openSnackBar(SnackbarTypeEnums.ERROR, `Wrong value format for ${HelperFunctions.fromCamelToTitleCase(this.editingField()!)}`)
        return
      }
      if (originalValue[0].value === newValue[0].value) {
        this.snackbarService.openSnackBar(SnackbarTypeEnums.WARNING, `No change in ${HelperFunctions.fromCamelToTitleCase(this.editingField()!)} value`)
      } else {
        this.accountService.updateUserDetails(newValue[0].field, newValue[0].value!)
        this.toggleIsBeingEdited(this.editingField()!)
      }
    } else {
      if (!this.columnValueValidator(this.editingField()!, this.newPassword())) {
        this.snackbarService.openSnackBar(SnackbarTypeEnums.ERROR, `Wrong value format for ${HelperFunctions.fromCamelToTitleCase(this.editingField()!)}`)
        return
      }
      this.accountService.updateUserDetails(this.editingField()!, this.newPassword()!, this.oldPassword()!)
      this.oldPassword.set(null)
      this.newPassword.set(null)
      this.toggleIsBeingEdited(this.editingField()!)
    }
  }

  columnValueValidator(column: string, value: any): boolean {
    switch (column) {
      case 'firstName':
      case 'lastName':
        return typeof value === 'string' && /^[a-zA-Z]+$/.test(value);

      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return typeof value === 'string' && emailPattern.test(value);

      case 'phoneNumber':
        const phoneNumberPattern = /^\d{8}$/;
        return typeof value === 'string' && phoneNumberPattern.test(value);

      case 'password':
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
        return typeof value === 'string' && passwordPattern.test(value);

      default:
        return false;
    }
  }

}
