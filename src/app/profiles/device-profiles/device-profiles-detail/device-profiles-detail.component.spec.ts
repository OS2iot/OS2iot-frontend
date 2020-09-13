import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceProfilesDetailComponent } from './device-profiles-detail.component';

describe('DeviceProfilesDetailComponent', () => {
  let component: DeviceProfilesDetailComponent;
  let fixture: ComponentFixture<DeviceProfilesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceProfilesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceProfilesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
