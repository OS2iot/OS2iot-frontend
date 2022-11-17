import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganisationDetailComponent } from './organisation-detail.component';

describe('OrganisationDetailComponent', () => {
  let component: OrganisationDetailComponent;
  let fixture: ComponentFixture<OrganisationDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
