import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
  name: "dkTime",
  standalone: false,
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, " 'den' dd-MM-yyyy kl. HH:mm");
  }
}

@Pipe({
  name: "dkTimeWithSeconds",
  standalone: false,
})
export class CustomDatePipeWithSeconds extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, " 'den' dd-MM-yyyy kl. HH:mm:ss");
  }
}

@Pipe({
  name: "dkTimeWithSecondsNoPrefix",
  standalone: false,
})
export class CustomDatePipeWithSecondsNoPrefix extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, "dd-MM-yyyy kl. HH:mm:ss");
  }
}

@Pipe({
  name: "tableDatePipe",
  standalone: false,
})
export class CustomTableDatePipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, "dd-MM-yyyy kl. HH:mm");
  }
}

@Pipe({
  name: "tableDateWithSecondsPipe",
  standalone: false,
})
export class CustomTableDateWithSecondsPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, "dd-MM-yyyy - HH:mm:ss");
  }
}

@Pipe({
  name: "dateOnly",
  standalone: false,
})
export class DateOnlyPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, "dd-MM-yyyy");
  }
}
