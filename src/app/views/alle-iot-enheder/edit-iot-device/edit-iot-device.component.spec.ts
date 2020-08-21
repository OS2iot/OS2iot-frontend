import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIotDeviceComponent } from './edit-iot-device.component';

describe('EditIotDeviceComponent', () => {
  let component: EditIotDeviceComponent;
  let fixture: ComponentFixture<EditIotDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIotDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIotDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
