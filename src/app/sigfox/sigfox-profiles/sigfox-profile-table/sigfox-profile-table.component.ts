import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SigfoxDeviceType } from '@shared/models/sigfox-device-type.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sigfox-profile-table',
  templateUrl: './sigfox-profile-table.component.html',
  styleUrls: ['./sigfox-profile-table.component.scss']
})
export class SigfoxProfileTableComponent implements OnInit, AfterViewInit {

  public dataSource = new MatTableDataSource<SigfoxDeviceType>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'contractId', 'alertEmail'];

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {
    this.translate.use('da');
  }

  ngOnInit(): void {
    const mock = [{
      name: 'Nummer 1',
      contractId: '123',
      description: 'nsdf',
      keepAlive: 1,
      alertEmail: 'device@1.dk',
    }];

    this.dataSource = new MatTableDataSource<SigfoxDeviceType>(mock);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
