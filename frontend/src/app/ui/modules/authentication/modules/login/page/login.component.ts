import {Component, inject, signal, WritableSignal} from '@angular/core';
import {Validators} from "../../../helpers/validators";
import {AuthService} from "../../../services/auth.service";
import {LoginCredentialsModel} from "../../../../../../models/authentication/interfaces/authentication.models";

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService);
  passwordVisible: boolean = false;

  email = signal('');
  password = signal('');

  isEmailValid = signal<boolean>(true)

  onInputChange(event: Event, field: WritableSignal<string>): void {
    const input = event.target as HTMLInputElement;
    field.set(input.value);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  validateForm(): boolean {
    this.isEmailValid.set(Validators.emailValidator(this.email));

    return this.isEmailValid()
  }

  onLoginClick(): void {
    if (this.validateForm()) {
      const loginCredentials: LoginCredentialsModel = {
        email: this.email(),
        password: this.password(),
      }
      this.authService.login(loginCredentials)
    }
  }
}
