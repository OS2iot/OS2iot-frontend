import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IotDevicesListComponent } from './iot-devices-list.component';

describe('ListIotDevicesComponent', () => {
  let component: IotDevicesListComponent;
  let fixture: ComponentFixture<IotDevicesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IotDevicesListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotDevicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
