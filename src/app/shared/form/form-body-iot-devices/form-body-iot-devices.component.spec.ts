import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBodyIotDevicesComponent } from './form-body-iot-devices.component';

describe('FormBodyIotDevicesComponent', () => {
  let component: FormBodyIotDevicesComponent;
  let fixture: ComponentFixture<FormBodyIotDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBodyIotDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBodyIotDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
