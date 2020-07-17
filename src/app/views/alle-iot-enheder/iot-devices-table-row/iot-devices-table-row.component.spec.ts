import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IotDevicesTableRowComponent } from './iot-devices-table-row.component';

describe('IotDevicesTableRowComponent', () => {
  let component: IotDevicesTableRowComponent;
  let fixture: ComponentFixture<IotDevicesTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IotDevicesTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotDevicesTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
