import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBodyDatatargetComponent } from './form-body-datatarget.component';

describe('FormBodyDatatargetComponent', () => {
  let component: FormBodyDatatargetComponent;
  let fixture: ComponentFixture<FormBodyDatatargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBodyDatatargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBodyDatatargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
