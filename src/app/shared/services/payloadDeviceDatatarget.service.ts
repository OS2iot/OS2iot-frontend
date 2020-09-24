import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';
import { PayloadDeviceDatatarget, PayloadDeviceDatatargetGetByDataTargetResponse } from '@app/models/payload-device-data';

@Injectable({
  providedIn: 'root'
})
export class PayloadDeviceDatatargetService {

  private BASEURL = 'iot-device-payload-decoder-data-target-connection';
  private BYDATATARGETURL = '/byDataTarget';

  constructor(private restService: RestService) { }

  get(id: number): Observable<any> {
    return this.restService.get(this.BASEURL, null, id);
  }

  put(payloadDeviceDatatarget: PayloadDeviceDatatarget): Observable<any> {
    return this.restService.put(this.BASEURL, payloadDeviceDatatarget, payloadDeviceDatatarget.id, {observe: 'response'});

  }

  post(payloadDeviceDatatarget: PayloadDeviceDatatarget): Observable<any> {
    return this.restService.post(this.BASEURL, payloadDeviceDatatarget);
  }

  delete(id: number) {
    return this.restService.delete(this.BASEURL, id);
  }

  getByDataTarget(id: number): Observable<PayloadDeviceDatatargetGetByDataTargetResponse> {
    return this.restService.get(this.BASEURL + this.BYDATATARGETURL, null, id);
  }

}
