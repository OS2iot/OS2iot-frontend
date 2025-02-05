import { NgFor, NgOptimizedImage } from "@angular/common";
import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
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
  imports: [
    NgOptimizedImage,
    NgFor,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TablePaginatorComponent implements OnInit {
  ngOnInit(): void {}
  @Input() paginator: MatPaginator;

  options: Option[] = [
    { value: 25, label: "25 pr. side" },
    { value: 50, label: "50 pr. side" },
    { value: 100, label: "100 pr. side" },
  ];
  selected: number = 25;
  currentPage: number = 1;
  numberOfPages: number = 0;
  ngAfterViewChecked() {
    if (this.paginator) this.numberOfPages = this.paginator.getNumberOfPages();
  }

  onRight(): void {
    if (!this.paginator.hasNextPage()) return;
    this.currentPage++;
    this.paginator.nextPage();
  }

  onSelected(event: any): void {
    console.log(event.value);
    this.selected = event.value;
    this.paginator._changePageSize(event.value);
  }

  onLeft(): void {
    if (this.currentPage === 1) return;
    this.currentPage--;
    this.paginator.previousPage();
  }
}
