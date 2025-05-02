import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { IotDeviceEditComponent } from "./iot-device-edit.component";

describe("IotDeviceEditComponent", () => {
  let component: IotDeviceEditComponent;
  let fixture: ComponentFixture<IotDeviceEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IotDeviceEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotDeviceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
