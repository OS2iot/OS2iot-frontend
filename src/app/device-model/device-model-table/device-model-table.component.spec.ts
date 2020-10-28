import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceModelTableComponent } from './device-model-table.component';

describe('DeviceModelTableComponent', () => {
  let component: DeviceModelTableComponent;
  let fixture: ComponentFixture<DeviceModelTableComponent>;

  beforeEach(async(() => {
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
