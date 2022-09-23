import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PermissionListComponent } from './permission-list.component';

describe('PermissionListComponent', () => {
  let component: PermissionListComponent;
  let fixture: ComponentFixture<PermissionListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
