import { TestBed } from '@angular/core/testing';

import { ScrollToTopService } from './scroll-to-top.service';

describe('ScrollToTopService', () => {
  let service: ScrollToTopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollToTopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
