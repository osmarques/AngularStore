import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  decimalSeparator = '.';
  thousandsSeparator = ',';
  currencySymbol = 'R$';
  priceError = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0.01), this.decimalPlacesValidator(2)]],
      stock: ['', [Validators.required, Validators.min(0), this.integerValidator]]
    });
  }

  ngOnInit(): void {
    this.detectLocaleSettings();
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.productId;

    if (this.isEditMode) {
      this.loadProduct();
    }
  }

  // Detecta configurações de localização do navegador
  detectLocaleSettings(): void {
    const locale = navigator.language || 'en-US';
    
    // Define separadores baseado no idioma
    if (locale.startsWith('pt') || locale.startsWith('es') || locale.startsWith('fr') || locale.startsWith('de') || locale.startsWith('it')) {
      // Idiomas que usam vírgula como separador decimal
      this.decimalSeparator = ',';
      this.thousandsSeparator = '.';
    } else {
      // Inglês e outros que usam ponto
      this.decimalSeparator = '.';
      this.thousandsSeparator = ',';
    }

    // Define símbolo da moeda baseado no locale
    if (locale.startsWith('pt')) {
      this.currencySymbol = 'R$';
    } else if (locale.startsWith('en-US')) {
      this.currencySymbol = '$';
    } else if (locale.startsWith('en-GB')) {
      this.currencySymbol = '£';
    } else if (locale.startsWith('de') || locale.startsWith('fr') || locale.startsWith('es') || locale.startsWith('it')) {
      this.currencySymbol = '€';
    }
  }

  loadProduct(): void {
    if (this.productId) {
      this.loading = true;
      this.productService.getProduct(this.productId).subscribe({
        next: (product) => {
          // Formatar preço para exibição baseado no locale
          const formattedProduct = {
            ...product,
            price: this.formatPriceForDisplay(product.price)
          };
          this.productForm.patchValue(formattedProduct);
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
      const formValue = { ...this.productForm.value };
      
      // Garante que price e stock são números
      formValue.price = parseFloat(formValue.price) || 0;
      formValue.stock = parseInt(formValue.stock) || 0;

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

  // Validador para números inteiros
  integerValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === '') {
      return null;
    }
    if (!Number.isInteger(Number(value))) {
      return { integer: true };
    }
    return null;
  }

  // Validador para casas decimais
  decimalPlacesValidator(maxDecimals: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === '') {
        return null;
      }
      const stringValue = value.toString();
      const separator = this.decimalSeparator;
      if (stringValue.includes(separator)) {
        const decimals = stringValue.split(separator)[1];
        if (decimals && decimals.length > maxDecimals) {
          return { maxDecimals: { max: maxDecimals, actual: decimals.length } };
        }
      }
      return null;
    };
  }

  // Evento para campo de estoque - apenas números inteiros
  onStockInput(event: any): void {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    if (value !== numericValue) {
      event.target.value = numericValue;
      this.productForm.get('stock')?.setValue(numericValue);
    }
  }

  // Evento para campo de preço - máximo 2 casas decimais
  onPriceInput(event: any): void {
    let value = event.target.value;
    const separator = this.decimalSeparator;
    this.priceError = '';
    
    // Remove caracteres não numéricos exceto o separador decimal
    if (separator === ',') {
      value = value.replace(/[^0-9,]/g, '');
    } else {
      value = value.replace(/[^0-9.]/g, '');
    }
    
    // Garante apenas um separador decimal
    const parts = value.split(separator);
    if (parts.length > 2) {
      value = parts[0] + separator + parts.slice(1).join('');
    }
    
    // Verifica se está tentando inserir mais de 2 casas decimais
    if (parts[1] && parts[1].length > 2) {
      this.priceError = 'Preço deve ter no máximo 2 casas decimais';
      value = parts[0] + separator + parts[1].substring(0, 2);
      // Bloqueia a entrada
      event.preventDefault();
    }
    
    if (event.target.value !== value) {
      event.target.value = value;
      // Converte para formato padrão (ponto) para armazenamento
      const standardValue = separator === ',' ? value.replace(',', '.') : value;
      this.productForm.get('price')?.setValue(standardValue);
    }
  }

  // Evento keydown para bloquear entrada de 3ª casa decimal
  onPriceKeydown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const separator = this.decimalSeparator;
    const key = event.key;
    
    // Se não é um número, permite teclas de controle
    if (!/[0-9]/.test(key) && !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) {
      if (key !== separator) {
        event.preventDefault();
        return;
      }
    }
    
    // Verifica se já tem separador decimal
    const parts = value.split(separator);
    if (parts.length > 1 && parts[1].length >= 2 && /[0-9]/.test(key)) {
      // Se o cursor está após as 2 casas decimais, bloqueia
      const cursorPos = input.selectionStart || 0;
      const decimalPos = value.indexOf(separator);
      if (cursorPos > decimalPos + 2) {
        this.priceError = 'Preço deve ter no máximo 2 casas decimais';
        event.preventDefault();
        return;
      }
    }
    
    this.priceError = '';
  }

  // Formatar preço para exibição
  formatPriceForDisplay(price: number | string): string {
    if (!price) return '';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return '';
    
    const formatted = numPrice.toFixed(2);
    return this.decimalSeparator === ',' ? formatted.replace('.', ',') : formatted;
  }
}
