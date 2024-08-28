import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { DeviceModelComponent } from "./device-model.component";

describe("DeviceModelComponent", () => {
    let component: DeviceModelComponent;
    let fixture: ComponentFixture<DeviceModelComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DeviceModelComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeviceModelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
