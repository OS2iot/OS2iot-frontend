import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionRowComponent } from './permission-row.component';

describe('PermissionRowComponent', () => {
  let component: PermissionRowComponent;
  let fixture: ComponentFixture<PermissionRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
