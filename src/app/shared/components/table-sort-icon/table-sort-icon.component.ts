import { Component, Input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-table-sort-icon",
  templateUrl: "./table-sort-icon.component.html",
  styleUrls: ["./table-sort-icon.component.scss"],
  imports: [MatIcon],
})
export class TableSortIconComponent {
  @Input() sortDirection: "asc" | "desc" = "asc";
}
