import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupEditComponent } from './usergroup-edit.component';

describe('UsergroupEditComponent', () => {
  let component: UsergroupEditComponent;
  let fixture: ComponentFixture<UsergroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsergroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
