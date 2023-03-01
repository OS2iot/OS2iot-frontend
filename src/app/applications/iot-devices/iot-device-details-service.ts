import { Injectable } from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';

@Injectable({ providedIn: 'root' })
export class IotDeviceDetailsService {
  device: IotDevice;
  latitude: number;
  longitude: number;
}
