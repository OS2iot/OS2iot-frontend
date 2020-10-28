import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceModelDetailComponent } from './device-model-detail.component';

describe('DeviceModelDetailComponent', () => {
  let component: DeviceModelDetailComponent;
  let fixture: ComponentFixture<DeviceModelDetailComponent>;

  beforeEach(async(() => {
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
