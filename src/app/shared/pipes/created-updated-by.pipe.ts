import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "createdUpdatedBy",
    standalone: false
})
export class CreatedUpdatedByPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const createdBy = " af " + value;
    return createdBy;
  }
}
