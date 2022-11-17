import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PermissionTabelComponent } from './permission-tabel.component';

describe('PermissionTabelComponent', () => {
  let component: PermissionTabelComponent;
  let fixture: ComponentFixture<PermissionTabelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionTabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
