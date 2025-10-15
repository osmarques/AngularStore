import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId?: number;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      stock: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.productId;

    if (this.isEditMode) {
      this.loadProduct();
    }
  }

  loadProduct(): void {
    if (this.productId) {
      this.loading = true;
      this.productService.getProduct(this.productId).subscribe({
        next: (product) => {
          this.productForm.patchValue(product);
          this.loading = false;
        },
        error: (error: string) => {
          this.loading = false;
          this.errorMessage = 'Erro ao carregar produto: ' + error;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      const formValue = this.productForm.value;

      if (this.isEditMode) {
        this.productService.updateProduct(this.productId!, formValue).subscribe({
          next: () => {
            this.router.navigate(['/products']);
          },
          error: (error: string) => {
            this.loading = false;
            this.errorMessage = 'Erro ao atualizar produto: ' + error;
          }
        });
      } else {
        this.productService.createProduct(formValue).subscribe({
          next: () => {
            this.router.navigate(['/products']);
          },
          error: (error: string) => {
            this.loading = false;
            this.errorMessage = 'Erro ao criar produto: ' + error;
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
