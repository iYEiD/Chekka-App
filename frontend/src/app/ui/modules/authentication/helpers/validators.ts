import { Signal } from '@angular/core';

export class Validators {

  public static emailValidator(emailSignal: Signal<string>): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(emailSignal());
  }

  // Phone Number Validator (xx xxx xxx)
  public static phoneValidator(phoneSignal: Signal<string>): boolean {
    // Match any 8 digits (ignoring spaces or other non-digit characters)
    const phonePattern = /^\d{8}$/;

    // Remove any non-digit characters before applying the regex check
    const cleanedPhone = phoneSignal().replace(/\D/g, '');

    return phonePattern.test(cleanedPhone);
  }

  // Password Validator (minimum 8 characters, 1 capital letter, 1 special character, 1 number)
  public static passwordValidator(passwordSignal: Signal<string>): boolean {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
    return passwordPattern.test(passwordSignal());
  }

  // Password Match Validator
  public static passwordMatchValidator(passwordSignal: Signal<string>, confirmPasswordSignal: Signal<string>): boolean {
    return passwordSignal() === confirmPasswordSignal();
  }
}
