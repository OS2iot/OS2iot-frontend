import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatargetListComponent } from './datatarget-list.component';

describe('DatatargetListComponent', () => {
  let component: DatatargetListComponent;
  let fixture: ComponentFixture<DatatargetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatargetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatargetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
