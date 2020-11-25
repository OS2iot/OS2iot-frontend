import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dkTime'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, " 'd.' dd-MM-yyyy kl. HH:mm");
    }
}