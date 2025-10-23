import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "activeDeactive",
    standalone: false
})
export class ActiveDeactivePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value ? "Aktiveret" : "Deaktiveret";
  }
}
