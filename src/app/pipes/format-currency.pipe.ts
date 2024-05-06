import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
  standalone: true
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(value: number | string): string {
    let data = value.toString();
    return formatNumber(parseInt(data), 'en-US');
  }

}
