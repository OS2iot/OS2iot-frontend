import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoTDeviceDetailComponent } from './iot-device-detail.component';

describe('IoTDeviceDetailComponent', () => {
  let component: IoTDeviceDetailComponent;
  let fixture: ComponentFixture<IoTDeviceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IoTDeviceDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoTDeviceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
