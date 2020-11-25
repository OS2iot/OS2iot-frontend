import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createdUpdatedBy'
})
export class CreatedUpdatedByPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const createdBy = ' af ' + value;
    return createdBy;
  }
}
