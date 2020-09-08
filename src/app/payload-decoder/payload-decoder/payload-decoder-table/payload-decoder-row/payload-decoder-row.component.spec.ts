import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayloadDecoderRowComponent } from './payload-decoder-row.component';

describe('PayloadDecoderRowComponent', () => {
  let component: PayloadDecoderRowComponent;
  let fixture: ComponentFixture<PayloadDecoderRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayloadDecoderRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayloadDecoderRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
