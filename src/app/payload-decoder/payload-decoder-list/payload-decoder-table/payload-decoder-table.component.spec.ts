import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PayloadDecoderTableComponent } from "./payload-decoder-table.component";

describe("PayloadDecoderTableComponent", () => {
  let component: PayloadDecoderTableComponent;
  let fixture: ComponentFixture<PayloadDecoderTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PayloadDecoderTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayloadDecoderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
