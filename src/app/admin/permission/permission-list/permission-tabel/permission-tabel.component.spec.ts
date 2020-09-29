import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionTabelComponent } from './permission-tabel.component';

describe('PermissionTabelComponent', () => {
  let component: PermissionTabelComponent;
  let fixture: ComponentFixture<PermissionTabelComponent>;

  beforeEach(async(() => {
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
