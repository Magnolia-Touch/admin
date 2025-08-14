import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/interceptor/auth.service';
import { AlertService } from '../../shared/alert/service/alert.service';
import { Router } from '@angular/router';

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
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const identifier = this.loginForm.value.email
      const password = this.loginForm.value.password

      this.authService.login(identifier, password).subscribe({
        next: (response: any) => {
          this.alertService.showAlert({
            message: response.message,
            type: 'success',
            autoDismiss: true,
            duration: 4000
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          console.error('Login failed:', error);
        }
      });
    }
  }
}
