import { TestBed } from '@angular/core/testing';

import { DeviceProfileService } from './device-profile.service';

describe('DeviceProfileService', () => {
  let service: DeviceProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
