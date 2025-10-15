import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CurrencyBrPipe } from '../../pipes/currency-br.pipe';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule, CurrencyBrPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  products: Product[] = [];
  loading = false;
  errorMessage = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error: string) => {
        this.products = [];
        this.loading = false;
        this.errorMessage = 'Erro ao carregar produtos: ' + error;
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (error: string) => {
          this.errorMessage = 'Erro ao excluir produto: ' + error;
        }
      });
    }
  }
}
