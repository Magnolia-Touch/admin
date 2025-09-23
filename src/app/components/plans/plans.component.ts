import { Component, OnInit, TemplateRef } from '@angular/core';
import { PlansService } from './service/plans.service';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../shared/alert/service/alert.service';

@Component({
  selector: 'app-plans',
  imports: [CommonModule, FormsModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent implements OnInit {

  plans: any[] = [];
  loading = false;
  modalRef?: NgbModalRef;
  submitting: boolean = false;

  newPlan = {
    Subscription_name: '',
    discription: '',
    Frequency: 1,
    Price: ''
  };

  constructor(
    private service: PlansService,
    private modalService: NgbModal,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans() {
    this.loading = true;
    this.service.getAllPlans().subscribe({
      next: (res: any) => {
        this.plans = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  openAddModal(content: TemplateRef<any>) {
    this.newPlan = { Subscription_name: '', discription: '', Frequency: 1, Price: '' };
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  savePlan() {
    if (!this.newPlan.Subscription_name || !this.newPlan.Price) return;

    this.submitting = true;

    this.service.addPlan(this.newPlan).subscribe({
      next: (res: any) => {
        this.alertService.showAlert({
          message: 'Plan Created',
          type: 'success',
          autoDismiss: true,
          duration: 4000
        });
        this.submitting = false;
        this.loadPlans();
        this.modalRef?.close();
      },
      error: (err) => {
        this.alertService.showAlert({
          message: err.error.message || 'Plan creation failed. Try again.',
          type: 'error',
          autoDismiss: true,
          duration: 4000
        });
        this.submitting = false;
        console.error(err)
      }
    });
  }

}
