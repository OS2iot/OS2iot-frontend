import { TestBed } from '@angular/core/testing';

import { ChirpstackGatewayService } from './chirpstack-gateway.service';

describe('ChirpstackGatewayService', () => {
  let service: ChirpstackGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChirpstackGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    const test = service.get(1)
    console.log(test)
  });
});
