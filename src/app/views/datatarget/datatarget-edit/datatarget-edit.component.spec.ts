import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatargetEditComponent } from './datatarget-edit.component';

describe('DatatargetEditComponent', () => {
  let component: DatatargetEditComponent;
  let fixture: ComponentFixture<DatatargetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatargetEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatargetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
