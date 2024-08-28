import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ApplicationsTableComponent } from "./applications-table.component";

describe("ApplicationTableOtherComponent", () => {
  let component: ApplicationsTableComponent;
  let fixture: ComponentFixture<ApplicationsTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationsTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
