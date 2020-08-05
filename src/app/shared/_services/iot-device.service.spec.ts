import { TestBed } from '@angular/core/testing';

import { IoTDeviceService } from './iot-device.service';

describe('IoTDeviceService', () => {
  let service: IoTDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IoTDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
