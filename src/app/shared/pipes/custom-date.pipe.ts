import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dkTime'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, ' \'den\' dd-MM-yyyy kl. HH:mm');
    }
}


@Pipe({
    name: 'tableDatePipe'
})
export class CustomTableDatePipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, 'dd MMM, yyyy - HH:mm');
    }
}

@Pipe({
  name: 'dateOnly',
})
export class DateOnlyPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, 'dd MMM, yyyy');
  }
}
