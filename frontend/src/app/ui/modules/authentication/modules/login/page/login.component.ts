import {Component, signal, WritableSignal} from '@angular/core';
import {Validators} from "../../../helpers/validators";

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
      const loginCredentials = {
        email: this.email(),
        password: this.password(),
      }
      console.log(loginCredentials);
    }
  }
}
