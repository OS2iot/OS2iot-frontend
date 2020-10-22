import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayloadDecoderDetailComponent } from './payload-decoder-detail.component';

describe('PayloadDecoderDetailComponent', () => {
  let component: PayloadDecoderDetailComponent;
  let fixture: ComponentFixture<PayloadDecoderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayloadDecoderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayloadDecoderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
