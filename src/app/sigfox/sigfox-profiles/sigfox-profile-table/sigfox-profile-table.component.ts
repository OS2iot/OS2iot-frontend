import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SigfoxDeviceType } from '@shared/models/sigfox-device-type.model';
import { TranslateService } from '@ngx-translate/core';
import { SigfoxService } from '@shared/services/sigfox.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';

@Component({
  selector: 'app-sigfox-profile-table',
  templateUrl: './sigfox-profile-table.component.html',
  styleUrls: ['./sigfox-profile-table.component.scss']
})
export class SigfoxProfileTableComponent implements OnInit, AfterViewInit {
  public sigfoxDevices: SigfoxDeviceType[];
  public sigfoxGroup: SigfoxGroup;
  public dataSource = new MatTableDataSource<SigfoxDeviceType>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'contractId', 'alertEmail'];

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private globalService: SharedVariableService,
    private sigfoxService: SigfoxService,
  ) {
    this.translate.use('da');
  }

  ngOnInit(): void {
    this.getSigFoxDevices();
    this.dataSource = new MatTableDataSource<SigfoxDeviceType>(this.sigfoxDevices);

  }

  getSigFoxDevices() {
    this.sigfoxService.getDeviceTypes(this.getCurrentGroupIds())
      .subscribe((response) => {
        this.sigfoxDevices = response.data;
      },
        (error) => {
          console.log(error);
        }
      );
  }

  getCurrentGroupIds(): number {
    return this.sigfoxGroup.id;
  }




  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
