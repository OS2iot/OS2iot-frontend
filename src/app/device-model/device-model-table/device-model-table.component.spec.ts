import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeviceModelTableComponent } from './device-model-table.component';

describe('DeviceModelTableComponent', () => {
  let component: DeviceModelTableComponent;
  let fixture: ComponentFixture<DeviceModelTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceModelTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceModelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
