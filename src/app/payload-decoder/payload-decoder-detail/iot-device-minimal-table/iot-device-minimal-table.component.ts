import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import moment from 'moment';
import {
  IoTDeviceMinimal,
  IoTDevicesMinimalResponse,
} from '@applications/iot-devices/iot-device.model';
import { IoTDeviceService } from '@applications/iot-devices/iot-device.service';
import { PayloadDecoder } from '@payload-decoder/payload-decoder.model';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { Observable, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';
import { DefaultPageSizeOptions } from '@shared/constants/page.constants';

@Component({
  selector: 'app-iot-device-minimal-table',
  templateUrl: './iot-device-minimal-table.component.html',
  styleUrls: ['./iot-device-minimal-table.component.scss'],
})
export class IoTDeviceMinimalTableComponent implements AfterViewInit {
  @Input() public payloadDecoder: PayloadDecoder;

  displayedColumns: string[] = ['name', 'organization', 'updatedAt'];
  data: IoTDeviceMinimal[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  public pageSize = environment.tablePageSize;
  public pageSizeOptions = DefaultPageSizeOptions;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: IoTDeviceService,
    private sharedVariableService: SharedVariableService,
    public translate: TranslateService
  ) {
    moment.locale('da');
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getIoTDevices();
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.count;

          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.data = data));
  }

  getIoTDevices(): Observable<IoTDevicesMinimalResponse> {
    return this.service.getIoTDevicesUsingPayloadDecoderMinimal(
      this.payloadDecoder.id,
      this.paginator.pageSize,
      this.paginator.pageIndex * this.paginator.pageSize
    );
  }

  getOrganizationName(organizationId: number) {
    return this.sharedVariableService
      .getOrganizationInfo()
      .find((org) => org.id === organizationId)?.name;
  }

  public lastActive(device: IoTDeviceMinimal) {
    if (device.lastActiveTime == null) {
      return this.translate.instant('ACTIVITY.NEVER');
    } else {
      return moment(device.lastActiveTime).fromNow();
    }
  }
}
