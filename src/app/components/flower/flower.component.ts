import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FlowersService } from './service/flowers.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flower',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './flower.component.html',
  styleUrl: './flower.component.css'
})
export class FlowerComponent implements OnInit {

  flowers: any[] = [];
  filteredFlowers: any[] = [];
  searchTerm: string = '';
  stockFilter: string = '';
  loading: boolean = false;
  addFlowerForm!: FormGroup;
  submitting: boolean = false;
  editingFlower: any = null;

  constructor(
    private service: FlowersService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadFlowers();

    this.addFlowerForm = this.fb.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      Price: ['', Validators.required],
      in_stock: [true],
      image: [null, Validators.required]
    });
  }

  loadFlowers() {
    this.loading = true;
    this.service.getAllFlowers().subscribe({
      next: (res: any) => {
        this.flowers = res.data || res;
        this.filteredFlowers = [...this.flowers];
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  filterFlowers() {
    this.filteredFlowers = this.flowers.filter(flower => {
      const matchesName = flower.Name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStock = this.stockFilter === '' || String(flower.in_stock) === this.stockFilter;
      return matchesName && matchesStock;
    });
  }

  setStockFilter(value: string) {
    this.stockFilter = value;
    this.filterFlowers();
  }

  resetFilters() {
    this.searchTerm = '';
    this.stockFilter = '';
    this.filteredFlowers = [...this.flowers];
  }

  openAddModal(content: TemplateRef<any>) {
    this.addFlowerForm.reset({ in_stock: true });
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  editFlower(flower: any, content: TemplateRef<any>) {
    this.editingFlower = flower;
    this.addFlowerForm.patchValue({
      Name: flower.Name,
      Description: flower.Description,
      Price: flower.Price,
      in_stock: flower.in_stock,
      image: null
    });
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.addFlowerForm.patchValue({ image: file });
    }
  }

  submitFlower(modalRef: any) {
    if (this.addFlowerForm.invalid) return;

    this.submitting = true;
    const formData = new FormData();
    Object.entries(this.addFlowerForm.value).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    const request$ = this.editingFlower
      ? this.service.updateFlowerStock(formData, this.editingFlower.id)
      : this.service.addFlower(formData);

    request$.subscribe({
      next: () => {
        this.submitting = false;
        modalRef.close();
        this.editingFlower = null;
        this.loadFlowers();
      },
      error: (err) => {
        console.log(err);
        this.submitting = false;
      }
    });
  }
}
