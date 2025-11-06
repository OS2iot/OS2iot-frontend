import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HttppushDetailTabsComponent } from "./httppush-detail-tabs.component";

describe("HttppushDetailTabsComponent", () => {
  let component: HttppushDetailTabsComponent;
  let fixture: ComponentFixture<HttppushDetailTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttppushDetailTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HttppushDetailTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
