import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIotDevicesComponent } from './list-iot-devices.component';

describe('ListIotDevicesComponent', () => {
  let component: ListIotDevicesComponent;
  let fixture: ComponentFixture<ListIotDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIotDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIotDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
