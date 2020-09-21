import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationRowComponent } from './organisation-row.component';

describe('OrganisationRowComponent', () => {
  let component: OrganisationRowComponent;
  let fixture: ComponentFixture<OrganisationRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisationRowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
