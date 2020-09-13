import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceProfilesItemComponent } from './device-profiles-item.component';

describe('DeviceProfilesItemComponent', () => {
  let component: DeviceProfilesItemComponent;
  let fixture: ComponentFixture<DeviceProfilesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceProfilesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceProfilesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
