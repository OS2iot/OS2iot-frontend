import { Pipe, PipeTransform } from "@angular/core";
import { sortBy } from "@shared/helpers/array.helper";

@Pipe({
  name: "sortBy",
  standalone: false,
})
export class SortByPipe implements PipeTransform {
  /**
   * Example:
   * ```
   * *ngFor="let c of arrayOfObjects | sortBy:<propertyName>:'asc'"
   * ```
   */
  transform<T>(value: T[], column: keyof T, order: "asc" | "desc" = "asc"): T[] {
    return sortBy(value, column, order);
  }
}
