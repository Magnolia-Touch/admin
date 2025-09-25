import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from './service/profile.service';
import { AlertService } from '../../shared/alert/service/alert.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  adminForm!: FormGroup;
  profile: any;
  loading = false;
  editingProfile = false;
  addingAdmin = false;

  constructor(
    private service: ProfileService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadProfile();
    this.adminForm = this.fb.group({
      customer_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      Phone: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loadProfile() {
    this.loading = true;
    this.service.getProfile().subscribe({
      next: (res: any) => {
        this.profile = res.data;
        this.profileForm = this.fb.group({
          customer_name: [this.profile.customer_name, Validators.required],
          email: [this.profile.email, [Validators.required, Validators.email]],
          Phone: [this.profile.Phone, Validators.required]
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  updateProfile() {
    if (this.profileForm.invalid) return;
    this.service.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        this.alertService.showAlert({
          message: 'Profile updated successfully',
          type: 'success',
          autoDismiss: true,
          duration: 4000
        });
        this.editingProfile = false;
        this.loadProfile();
      },
      error: (err) => {
        this.alertService.showAlert({
          message: err.error.message || 'Updation failed. Try again.',
          type: 'error',
          autoDismiss: true,
          duration: 4000
        });
      }
    });
  }

  createAdmin() {
    if (this.adminForm.invalid) return;
    this.service.createAdmin(this.adminForm.value).subscribe({
      next: () => {
        this.alertService.showAlert({
          message: 'New admin created successfully',
          type: 'success',
          autoDismiss: true,
          duration: 4000
        });
        this.adminForm.reset();
        this.addingAdmin = false;
      },
      error: (err) => {
        this.alertService.showAlert({
          message: err.error.message || 'Creation failed. Try again.',
          type: 'error',
          autoDismiss: true,
          duration: 4000
        });
      }
    });
  }
}
