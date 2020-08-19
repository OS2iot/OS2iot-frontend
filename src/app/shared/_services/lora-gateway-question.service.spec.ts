import { TestBed } from '@angular/core/testing';

import { LoraGatewayQuestionService } from './lora-gateway-question.service';

describe('LoraGatewayService', () => {
  let service: LoraGatewayQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoraGatewayQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
