import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIotDevicesComponent } from './create-iot-devices.component';

describe('CreateIotDevicesComponent', () => {
  let component: CreateIotDevicesComponent;
  let fixture: ComponentFixture<CreateIotDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIotDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIotDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
