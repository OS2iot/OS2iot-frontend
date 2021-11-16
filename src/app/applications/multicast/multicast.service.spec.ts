import { TestBed } from '@angular/core/testing';

import { MulticastService } from './multicast.service';

describe('MulticastService', () => {
  let service: MulticastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MulticastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
