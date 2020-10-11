import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxDeviceTypeTableComponent } from './sigfox-device-type-table.component';

describe('SigfoxDeviceTypeTableComponent', () => {
  let component: SigfoxDeviceTypeTableComponent;
  let fixture: ComponentFixture<SigfoxDeviceTypeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxDeviceTypeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxDeviceTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
