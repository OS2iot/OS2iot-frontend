import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PayloadDecoderListComponent } from "./payload-decoder-list.component";

describe("PayloadDecoderListComponent", () => {
  let component: PayloadDecoderListComponent;
  let fixture: ComponentFixture<PayloadDecoderListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PayloadDecoderListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayloadDecoderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
