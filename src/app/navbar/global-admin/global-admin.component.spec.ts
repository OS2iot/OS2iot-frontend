import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAdminComponent } from './global-admin.component';

describe('GlobalAdminComponent', () => {
  let component: GlobalAdminComponent;
  let fixture: ComponentFixture<GlobalAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
