import { Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "@environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { SigfoxDeviceType } from "@shared/models/sigfox-device-type.model";
import { SigfoxGroup } from "@shared/models/sigfox-group.model";
import { DefaultPageSizeOptions } from "@shared/constants/page.constants";

@Component({
    selector: "app-sigfox-device-type-table",
    templateUrl: "./sigfox-device-type-table.component.html",
    styleUrls: ["./sigfox-device-type-table.component.scss"],
    standalone: false
})
export class SigfoxDeviceTypeTableComponent implements OnInit, OnChanges {
  @Input() sigfoxDevices: SigfoxDeviceType[];
  public dataSource = new MatTableDataSource<SigfoxDeviceType>();

  @Input() sigfoxGroup: SigfoxGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ["name", "alertEmail"];
  public pageSize = environment.tablePageSize;
  public pageSizeOptions = DefaultPageSizeOptions;
  @Input() isLoadingResults: boolean;
  resultsLength: number;

  constructor(private translate: TranslateService, private route: ActivatedRoute, private router: Router) {
    this.translate.use("da");
  }

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.sigfoxDevices) {
      this.dataSource.data = this.sigfoxDevices.sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));
      this.dataSource.paginator = this.paginator;
      this.resultsLength = this.sigfoxDevices.length;
    }
  }

  editDeviceType(row: any) {
    this.router.navigate([row.id, "edit-device-type"], {
      relativeTo: this.route,
    });
  }
}
