import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { SigfoxDeviceTypesEditComponent } from "./sigfox-device-types-edit.component";

describe("SigfoxDeviceTypesEditComponent", () => {
    let component: SigfoxDeviceTypesEditComponent;
    let fixture: ComponentFixture<SigfoxDeviceTypesEditComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SigfoxDeviceTypesEditComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SigfoxDeviceTypesEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
