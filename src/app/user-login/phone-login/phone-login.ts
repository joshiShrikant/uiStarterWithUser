import { Component } from '@angular/core';

@Component({
  selector: 'app-phone-login',
  imports: [],
  templateUrl: './phone-login.html',
  styleUrl: './phone-login.css'
})
export class PhoneLogin {
 phoneNumber = '';
  otp = '';
  otpSent = false;
  confirmationResult!: firebase.auth.ConfirmationResult;

  constructor(private phoneAuth: PhoneAuthService) {}

  async sendCode() {
    this.confirmationResult = await this.phoneAuth.sendOTP(this.phoneNumber, 'recaptcha-container');
    this.otpSent = true;
  }

  async verifyCode() {
    const result = await this.phoneAuth.verifyOTP(this.confirmationResult, this.otp);
    console.log('User signed in:', result.user);
  }
}