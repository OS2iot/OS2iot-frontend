import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { DatatargetDetailComponent } from "./datatarget-detail.component";

describe("DatatargetComponent", () => {
  let component: DatatargetDetailComponent;
  let fixture: ComponentFixture<DatatargetDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DatatargetDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatargetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
