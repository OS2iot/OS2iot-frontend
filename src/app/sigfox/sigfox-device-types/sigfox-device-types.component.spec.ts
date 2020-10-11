import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxDeviceTypesComponent } from './sigfox-device-types.component';

describe('SigfoxDeviceTypesComponent', () => {
  let component: SigfoxDeviceTypesComponent;
  let fixture: ComponentFixture<SigfoxDeviceTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxDeviceTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxDeviceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
