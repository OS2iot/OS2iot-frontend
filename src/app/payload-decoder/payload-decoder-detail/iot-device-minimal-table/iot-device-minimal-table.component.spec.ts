import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoTDeviceMinimalTableComponent } from './iot-device-minimal-table.component';

describe('IoTDeviceMinimalTableComponent', () => {
  let component: IoTDeviceMinimalTableComponent;
  let fixture: ComponentFixture<IoTDeviceMinimalTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoTDeviceMinimalTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoTDeviceMinimalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
