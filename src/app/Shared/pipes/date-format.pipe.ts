import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {


  transform(value: Date | string, format: string = 'dd/MM/yy'): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year

    return `${day}/${month}/${year}`;
  }
}
