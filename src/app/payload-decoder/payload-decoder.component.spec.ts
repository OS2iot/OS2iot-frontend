import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayloadDecoderComponent } from './payload-decoder.component';

describe('PayloadDecoderComponent', () => {
  let component: PayloadDecoderComponent;
  let fixture: ComponentFixture<PayloadDecoderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayloadDecoderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayloadDecoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
