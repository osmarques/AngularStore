import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBr',
  standalone: true
})
export class CurrencyBrPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null || isNaN(value)) {
      return this.getDefaultCurrency();
    }
    
    const locale = navigator.language || 'pt-BR';
    const currency = this.getCurrencyCode(locale);
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(value);
  }

  private getCurrencyCode(locale: string): string {
    if (locale.startsWith('pt')) return 'BRL';
    if (locale.startsWith('en-US')) return 'USD';
    if (locale.startsWith('en-GB')) return 'GBP';
    if (locale.startsWith('de') || locale.startsWith('fr') || locale.startsWith('es') || locale.startsWith('it')) return 'EUR';
    return 'BRL'; // Default
  }

  private getDefaultCurrency(): string {
    const locale = navigator.language || 'pt-BR';
    if (locale.startsWith('pt')) return 'R$ 0,00';
    if (locale.startsWith('en-US')) return '$0.00';
    if (locale.startsWith('en-GB')) return '£0.00';
    if (locale.startsWith('de') || locale.startsWith('fr') || locale.startsWith('es') || locale.startsWith('it')) return '€0,00';
    return 'R$ 0,00';
  }
}