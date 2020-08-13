import { TestBed } from '@angular/core/testing';

import { IotDeviceQuestionsService } from './iot-device-questions.service';

describe('IotDeviceQuestionsService', () => {
  let service: IotDeviceQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IotDeviceQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
