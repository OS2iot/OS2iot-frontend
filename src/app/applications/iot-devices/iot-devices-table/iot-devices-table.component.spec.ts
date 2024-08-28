import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { IotDevicesTableComponent } from "./iot-devices-table.component";

describe("IotDevicesTableComponent", () => {
    let component: IotDevicesTableComponent;
    let fixture: ComponentFixture<IotDevicesTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [IotDevicesTableComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IotDevicesTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
