import {Component, signal, computed, effect, WritableSignal, inject} from '@angular/core';
import {Validators} from "../../../helpers/validators";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  authService = inject(AuthService);

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

  constructor() {}

  onInputChange(event: Event, field: WritableSignal<string>): void {
    const input = event.target as HTMLInputElement;
    field.set(input.value);
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
        confirmPassword: this.confirmPassword(),
      }
      this.authService.signUp(userInfo)
    }
  }
}
