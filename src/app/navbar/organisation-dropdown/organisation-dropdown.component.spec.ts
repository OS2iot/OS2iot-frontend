import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { OrganisationDropdownComponent } from "./organisation-dropdown.component";

describe("OrganisationDropdownComponent", () => {
  let component: OrganisationDropdownComponent;
  let fixture: ComponentFixture<OrganisationDropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisationDropdownComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
