import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceModelComponent } from './device-model.component';

describe('DeviceModelComponent', () => {
  let component: DeviceModelComponent;
  let fixture: ComponentFixture<DeviceModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
