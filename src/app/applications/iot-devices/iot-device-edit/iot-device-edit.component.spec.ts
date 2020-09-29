import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IotDeviceEditComponent } from './iot-device-edit.component';

describe('IotDeviceEditComponent', () => {
  let component: IotDeviceEditComponent;
  let fixture: ComponentFixture<IotDeviceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IotDeviceEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotDeviceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
