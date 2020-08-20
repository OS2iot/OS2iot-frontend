import { TestBed } from '@angular/core/testing';

import { ApplicationQuestionsService } from './application-questions.service';

describe('ApplicationQuestionsService', () => {
  let service: ApplicationQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
