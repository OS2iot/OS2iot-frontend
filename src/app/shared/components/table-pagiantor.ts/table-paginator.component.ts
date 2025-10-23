import { NgClass, NgFor } from "@angular/common";
import { AfterViewChecked, Component, Input, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { DomSanitizer } from "@angular/platform-browser";

export interface Option {
  value: number;
  label: string;
}

@Component({
    selector: "app-table-paginator",
    templateUrl: "./table-paginator.component.html",
    styleUrls: ["./table-paginator.component.scss"],
    imports: [NgFor, MatIconModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatButtonModule, NgClass]
})
export class TablePaginatorComponent implements OnInit, AfterViewChecked {
  ngOnInit(): void {}
  @Input() paginator: MatPaginator;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "left-angle",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/angle-left.svg"),
      {}
    );

    this.matIconRegistry.addSvgIcon(
      "right-angle",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/angle-right.svg"),
      {}
    );

    this.matIconRegistry.addSvgIcon(
      "down-angle",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/angle-down.svg"),
      {}
    );
  }
  options: Option[] = [
    { value: 25, label: "25 pr. side" },
    { value: 50, label: "50 pr. side" },
    { value: 100, label: "100 pr. side" },
  ];
  selected: number = 25;
  currentPage: number = 1;
  numberOfPages: number = 1;

  hasNextPage: boolean = false;

  ngAfterViewChecked() {
    if (this.paginator && this.paginator.getNumberOfPages()) {
      this.numberOfPages = this.paginator.getNumberOfPages() ?? 0;
      this.hasNextPage = this.paginator.hasNextPage();
    }
  }

  onRight(): void {
    if (!this.paginator.hasNextPage()) return;
    this.currentPage++;
    this.paginator.nextPage();
  }

  onSelected(event: any): void {
    this.selected = event.value;
    this.paginator._changePageSize(event.value);
  }

  onLeft(): void {
    if (this.currentPage === 1) return;
    this.currentPage--;
    this.paginator.previousPage();
  }
}
