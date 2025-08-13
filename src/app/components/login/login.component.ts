import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLogin = true;
  showLoginPassword = false;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

    onLogin() {
    if (this.loginForm.valid) {
      // const identifier = this.loginForm.value.email
      // const password = this.loginForm.value.password

      // this.authService.login(identifier, password).subscribe({
      //   next: (response: any) => {
      //     console.log('Login successful:', response);
      //     this.alertService.showAlert({
      //       message: 'Login Successfull',
      //       type: 'success',
      //       autoDismiss: true,
      //       duration: 4000
      //     });
      //     this.router.navigate(['/home']);
      //   },
      //   error: (error: any) => {
      //     console.error('Login failed:', error);
      //   }
      // });
    }
  }
}
