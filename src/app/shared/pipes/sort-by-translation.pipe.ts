import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { sortBySelector } from "@shared/helpers/array.helper";

@Pipe({
    name: "sortByTranslation",
    standalone: false
})
export class SortByTranslationPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  /**
   * Example:
   * ```
   * *ngFor="let c of arrayOfObjects | sortBy:<propertyName>:'asc'"
   * ```
   */
  transform<T>(
    translationValues: T[],
    column: keyof T | undefined,
    order: "asc" | "desc" = "asc",
    prefix: string = "",
    suffix: string = ""
  ): T[] {
    const res = sortBySelector(
      translationValues,
      val => this.translate.instant(prefix + (column ? val[column] : val) + suffix),
      order
    );

    return res;
  }
}
