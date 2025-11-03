import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { TranslateService } from "@ngx-translate/core";

const ITEMS_PER_PAGE = "PAGINATOR.ITEM_PER_PAGE";
const NEXT_PAGE = "PAGINATOR.NEXT_PAGE";
const PREV_PAGE = "PAGINATOR.PREVIOUS_PAGE";
const FIRST_PAGE = "PAGINATOR.FIRST_PAGE";
const LAST_PAGE = "PAGINATOR.LAST_PAGE";
const OF = "PAGINATOR.OF";

@Injectable()
export class MatPaginatorIntlDa extends MatPaginatorIntl {
  ofLabel: string;

  public constructor(private translate: TranslateService) {
    super();

    this.translate.onLangChange.subscribe(() => {
      this.getAndInitTranslations();
    });

    this.getAndInitTranslations();
  }

  public getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.ofLabel} ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex: number = page * pageSize;
    const endIndex: number = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} ${this.ofLabel} ${length}`;
  };

  public getAndInitTranslations(): void {
    this.translate
      .get([ITEMS_PER_PAGE, NEXT_PAGE, PREV_PAGE, FIRST_PAGE, LAST_PAGE, OF])
      .subscribe((translation: any) => {
        this.itemsPerPageLabel = translation[ITEMS_PER_PAGE];
        this.nextPageLabel = translation[NEXT_PAGE];
        this.previousPageLabel = translation[PREV_PAGE];
        this.firstPageLabel = translation[FIRST_PAGE];
        this.lastPageLabel = translation[LAST_PAGE];
        this.ofLabel = translation[OF];

        this.changes.next();
      });
  }
}
