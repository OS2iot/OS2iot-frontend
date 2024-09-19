import { Injectable } from "@angular/core";
import { RestService } from "./rest.service";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { Downlink } from "@applications/iot-devices/iot-device-detail/downlink/downlink.model";

@Injectable({
  providedIn: "root",
})
export class DownlinkService {
  private IOT_DEVICE_URL = "iot-device/";
  private DOWNLINK_URL = "downlink";
  private HISTORICAL_DOWNLINK_URL = "historicalDownlink";
  private DOWNLINK_FLUSH_URL = "flushDownlinkQueue";

  constructor(private restService: RestService, private snackBar: MatSnackBar, public translate: TranslateService) {}

  public getDownlinkQueue(deviceId: number, params = {}): Observable<any> {
    const url = this.IOT_DEVICE_URL + deviceId + "/" + this.DOWNLINK_URL;
    return this.restService.get(url, params);
  }

  public getHistoricalDownlinkQueue(deviceId: number, params = {}): Observable<any> {
    const url = this.IOT_DEVICE_URL + deviceId + "/" + this.HISTORICAL_DOWNLINK_URL;
    return this.restService.get(url, params);
  }

  public postDownlink(downlink: Downlink, deviceId: number, params = {}): Observable<void> {
    const url = this.IOT_DEVICE_URL + deviceId + "/" + this.DOWNLINK_URL;
    return this.restService.post(url, downlink, params);
  }

  public showSendDownlinkFailNoDevices() {
    this.snackBar.open(this.translate.instant("SNACK.NODEVICES"), this.translate.instant("SNACK.CLOSE"), {
      duration: 10000,
    });
  }

  public flushQueue(id: number, params = {}): Observable<void> {
    const url = this.IOT_DEVICE_URL + id + "/" + this.DOWNLINK_FLUSH_URL;
    return this.restService.post(url, params);
  }
}
