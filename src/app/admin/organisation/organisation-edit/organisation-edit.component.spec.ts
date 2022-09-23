import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganisationEditComponent } from './organisation-edit.component';

describe('OrganisationEditComponent', () => {
  let component: OrganisationEditComponent;
  let fixture: ComponentFixture<OrganisationEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
