import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationDropdownComponent } from './organisation-dropdown.component';

describe('OrganisationDropdownComponent', () => {
  let component: OrganisationDropdownComponent;
  let fixture: ComponentFixture<OrganisationDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
