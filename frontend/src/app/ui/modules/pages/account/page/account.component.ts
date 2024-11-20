import {Component, computed, inject, signal} from '@angular/core';
import {AuthService} from "../../../authentication/services/auth.service";
import {UserViewModel} from "../../../../../models/authentication/interfaces/authentication.models";
import {SnackbarService} from "../../../../../services/snack-bar/services/snackbar.service";
import {SnackbarTypeEnums} from "../../../../../services/snack-bar/enum/snackbar-type.enums";
import {AccountService} from "../services/account.service";

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

    return details.map(detail => ({
      ...detail,
      isBeingEdited: detail.field === currentEditingField,
    }));
  });

  toggleIsBeingEdited(field: string) {
    const currentEditingField = this.editingField();

    if (currentEditingField === field) {
      this.editingField.set(null);
    } else {
      this.editingField.set(field);
    }
  }

  updateDetails() {
    let originalValue = this.userDetails().filter(detail => detail.field === this.editingField());
    let newValue = this.userDetailsWithEditing().filter(detail => detail.field === this.editingField());
    if (originalValue[0].value === newValue[0].value) {
      this.snackbarService.openSnackBar(SnackbarTypeEnums.WARNING, "No change in field value")
    } else {
      this.accountService.updateUserDetails(newValue[0])
    }
    this.toggleIsBeingEdited(this.editingField()!)
  }
}
