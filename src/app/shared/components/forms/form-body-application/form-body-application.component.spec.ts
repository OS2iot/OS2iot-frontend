import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormBodyApplicationComponent } from './form-body-application.component';

describe('FormBodyApplicationComponent', () => {
  let component: FormBodyApplicationComponent;
  let fixture: ComponentFixture<FormBodyApplicationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBodyApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBodyApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
