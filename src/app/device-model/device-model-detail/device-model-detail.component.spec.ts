import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeviceModelDetailComponent } from './device-model-detail.component';

describe('DeviceModelDetailComponent', () => {
  let component: DeviceModelDetailComponent;
  let fixture: ComponentFixture<DeviceModelDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceModelDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceModelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
