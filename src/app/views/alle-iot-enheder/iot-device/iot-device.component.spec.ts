import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoTDeviceComponent } from './iot-device.component';

describe('IotDeviceComponent', () => {
  let component: IoTDeviceComponent;
  let fixture: ComponentFixture<IoTDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoTDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoTDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
