import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceModelListComponent } from './device-model-list.component';

describe('DeviceModelListComponent', () => {
  let component: DeviceModelListComponent;
  let fixture: ComponentFixture<DeviceModelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceModelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
