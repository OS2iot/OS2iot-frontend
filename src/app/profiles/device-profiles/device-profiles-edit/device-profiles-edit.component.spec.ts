import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceProfilesEditComponent } from './device-profiles-edit.component';

describe('DeviceProfilesEditComponent', () => {
  let component: DeviceProfilesEditComponent;
  let fixture: ComponentFixture<DeviceProfilesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceProfilesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceProfilesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
