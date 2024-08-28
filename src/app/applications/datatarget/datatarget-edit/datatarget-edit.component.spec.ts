import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { DatatargetEditComponent } from "./datatarget-edit.component";

describe("DatatargetEditComponent", () => {
    let component: DatatargetEditComponent;
    let fixture: ComponentFixture<DatatargetEditComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DatatargetEditComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatatargetEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
