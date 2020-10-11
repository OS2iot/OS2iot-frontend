import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxDeviceTypesEditComponent } from './sigfox-device-types-edit.component';

describe('SigfoxDeviceTypesEditComponent', () => {
  let component: SigfoxDeviceTypesEditComponent;
  let fixture: ComponentFixture<SigfoxDeviceTypesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxDeviceTypesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxDeviceTypesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
