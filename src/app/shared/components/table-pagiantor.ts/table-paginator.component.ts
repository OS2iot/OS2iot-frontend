import { NgClass, NgFor } from "@angular/common";
import { AfterViewChecked, Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";

export interface Option {
  value: number;
  label: string;
}

@Component({
  selector: "app-table-paginator",
  templateUrl: "./table-paginator.component.html",
  styleUrls: ["./table-paginator.component.scss"],
  standalone: true,
  imports: [NgFor, MatIconModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatButtonModule, NgClass],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TablePaginatorComponent implements OnInit, AfterViewChecked {
  ngOnInit(): void {}
  @Input() paginator: MatPaginator;

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
