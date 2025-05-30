import { Injectable } from "@angular/core";
import { RestService } from "@shared/services/rest.service";
import { Observable } from "rxjs";
import {
  AppendCopiedDeviceDto,
  PayloadDeviceDatatarget,
  PayloadDeviceDatatargetGetManyResponse,
  PayloadDeviceDatatargetResponse,
} from "./payload-device-data.model";

@Injectable({
  providedIn: "root",
})
export class PayloadDeviceDatatargetService {
  private BASEURL = "iot-device-payload-decoder-data-target-connection";
  private BYDATATARGETURL = "/byDataTarget";
  private BYIOTDEVICEIURL = "/byIoTDevice";

  private APPENDCOPIEDIOTDEVICEURL = "/appendCopiedDevice";

  constructor(private restService: RestService) {}

  get(id: number): Observable<any> {
    return this.restService.get(this.BASEURL, null, id);
  }

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

  getByDataTarget(id: number): Observable<PayloadDeviceDatatargetGetManyResponse> {
    return this.restService.get(this.BASEURL + this.BYDATATARGETURL, null, id);
  }

  getByIoTDevice(id: number): Observable<PayloadDeviceDatatargetGetManyResponse> {
    return this.restService.get(this.BASEURL + this.BYIOTDEVICEIURL, null, id);
  }

  appendCopiedIoTDevice(id: number, dto: AppendCopiedDeviceDto): Observable<PayloadDeviceDatatargetResponse> {
    return this.restService.put(this.BASEURL + this.APPENDCOPIEDIOTDEVICEURL, dto, id);
  }

  mapToDatatargetDevicePayload(dto: PayloadDeviceDatatargetGetManyResponse): PayloadDeviceDatatarget[] {
    const payloadDeviceDatatargetList = [];
    dto.data.forEach(element => {
      payloadDeviceDatatargetList.push({
        id: element.id,
        iotDeviceIds: element.iotDevices.map(x => x.id),
        payloadDecoderId: element.payloadDecoder?.id,
        dataTargetId: element.dataTarget.id,
      });
    });
    return payloadDeviceDatatargetList;
  }
}
