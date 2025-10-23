import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "yesNo",
    standalone: false
})
export class YesNoPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value ? "Ja" : "Nej";
  }
}
