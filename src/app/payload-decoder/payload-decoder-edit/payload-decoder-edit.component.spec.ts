import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PayloadDecoderEditComponent } from "./payload-decoder-edit.component";

describe("PayloadDecoderEditComponent", () => {
  let component: PayloadDecoderEditComponent;
  let fixture: ComponentFixture<PayloadDecoderEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PayloadDecoderEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayloadDecoderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
