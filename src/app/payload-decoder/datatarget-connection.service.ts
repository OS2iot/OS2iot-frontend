import { Injectable } from "@angular/core";
import { RestService } from "@shared/services/rest.service";
import { Observable } from "rxjs";
import {
  AppendCopiedDeviceDto,
  DataTargetConnection,
  DataTargetConnectionGetManyResponse,
  DataTargetConnectionResponse,
  PayloadDeviceDatatarget,
} from "./payload-device-data.model";

@Injectable({
  providedIn: "root",
})
export class DatatargetConnectionService {
  private BASEURL = "iot-device-payload-decoder-data-target-connection";
  private BYDATATARGETURL = "/byDataTarget";
  private BYIOTDEVICEIURL = "/byIoTDevice";
  private BYAPPLICATIONURL = "/byApplication";

  private APPENDCOPIEDIOTDEVICEURL = "/appendCopiedDevice";

  constructor(private restService: RestService) {}

  put(payloadDeviceDatatarget: PayloadDeviceDatatarget): Observable<any> {
    return this.restService.put(this.BASEURL, payloadDeviceDatatarget, payloadDeviceDatatarget.id, {
      observe: "response",
    });
  }

  post(payloadDeviceDatatarget: PayloadDeviceDatatarget): Observable<any> {
    return this.restService.post(this.BASEURL, payloadDeviceDatatarget);
  }

  delete(id: number) {
    return this.restService.delete(this.BASEURL, id);
  }

  getById(id: number): Observable<DataTargetConnection> {
    return this.restService.get(this.BASEURL, null, id);
  }

  getByDataTarget(id: number): Observable<DataTargetConnectionGetManyResponse> {
    return this.restService.get(this.BASEURL + this.BYDATATARGETURL, null, id);
  }

  getByIoTDevice(id: number): Observable<DataTargetConnectionGetManyResponse> {
    return this.restService.get(this.BASEURL + this.BYIOTDEVICEIURL, null, id);
  }

  getByApplication(
    id: number,
    limit: number,
    offset: number,
    orderOn: string,
    sort: string
  ): Observable<DataTargetConnectionGetManyResponse> {
    return this.restService.get(this.BASEURL + this.BYAPPLICATIONURL, {
      applicationId: id,
      limit: limit,
      offset: offset,
      orderOn,
      sort,
    });
  }

  appendCopiedIoTDevice(id: number, dto: AppendCopiedDeviceDto): Observable<DataTargetConnectionResponse> {
    return this.restService.put(this.BASEURL + this.APPENDCOPIEDIOTDEVICEURL, dto, id);
  }
}
