import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayloadDecoderTableComponent } from './payload-decoder-table.component';

describe('PayloadDecoderTableComponent', () => {
  let component: PayloadDecoderTableComponent;
  let fixture: ComponentFixture<PayloadDecoderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayloadDecoderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayloadDecoderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
