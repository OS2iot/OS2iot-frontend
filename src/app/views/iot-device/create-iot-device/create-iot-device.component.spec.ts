import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIoTDeviceComponent } from './create-iot-device.component';

describe('CreateIoTDeviceComponent', () => {
  let component: CreateIoTDeviceComponent;
  let fixture: ComponentFixture<CreateIoTDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIoTDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIoTDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
