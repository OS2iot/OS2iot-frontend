import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupDetailComponent } from './usergroup-detail.component';

describe('UsergroupDetailComponent', () => {
  let component: UsergroupDetailComponent;
  let fixture: ComponentFixture<UsergroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsergroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
