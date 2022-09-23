import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PermissionComponent } from './permission.component';

describe('PermissionComponent', () => {
  let component: PermissionComponent;
  let fixture: ComponentFixture<PermissionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
