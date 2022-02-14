/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatatargetTypesServiceService } from './datatarget-types-service.service';

describe('Service: DatatargetTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatatargetTypesServiceService]
    });
  });

  it('should ...', inject([DatatargetTypesServiceService], (service: DatatargetTypesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
