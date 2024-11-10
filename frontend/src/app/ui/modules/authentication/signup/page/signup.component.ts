import {Component, signal, computed, effect, WritableSignal} from '@angular/core';
import {Validators} from "../../helpers/validators";

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isEmailSelected: boolean = false;
  passwordVisible: boolean = false;

  isEmailValid = signal<boolean>(true)
  isPhoneValid = signal<boolean>(true)
  isPasswordValid = signal<boolean>(true)
  doPasswordsMatch = signal<boolean>(true)
  isFirstNameValid = signal<boolean>(true)
  isLastNameValid = signal<boolean>(true)

  firstName = signal('');
  lastName = signal('');
  email = signal('');
  phone = signal('');
  password = signal('');
  confirmPassword = signal('');

  constructor() {
    effect(() => {
      const test = this.firstName()
      console.log(test)
    });
  }

  onInputChange(event: Event, field: WritableSignal<string>): void {
    const input = event.target as HTMLInputElement;
    field.set(input.value);
  }

  continueWithEmail() {
    this.isEmailSelected = true;
  }

  backButtonClicked() {
    this.isEmailSelected = false;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  validateForm(): boolean {
    this.isFirstNameValid.set(this.firstName().trim() !== '');
    this.isLastNameValid.set(this.lastName().trim() !== '');
    this.isEmailValid.set(Validators.emailValidator(this.email));
    this.isPhoneValid.set(Validators.phoneValidator(this.phone));
    this.isPasswordValid.set(Validators.passwordValidator(this.password));
    this.doPasswordsMatch.set(Validators.passwordMatchValidator(this.password, this.confirmPassword));

    return this.isFirstNameValid() && this.isLastNameValid() && this.isEmailValid() &&
      this.isPhoneValid() && this.isPasswordValid() && this.doPasswordsMatch()
  }

  onSignUpClick() {
    if (this.validateForm()) {
      const userInfo = {
        firstName: this.firstName(),
        lastName: this.lastName(),
        email: this.email(),
        phone: this.phone(),
        password: this.password(),
      }
      console.log("Form is valid", userInfo)
    } else {
      console.log("invalid form")
    }
  }
}
