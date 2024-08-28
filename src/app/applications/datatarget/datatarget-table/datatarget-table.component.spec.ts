import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { DatatargetTableComponent } from "./datatarget-table.component";

describe("DatatargetTabelComponent", () => {
    let component: DatatargetTableComponent;
    let fixture: ComponentFixture<DatatargetTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DatatargetTableComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatatargetTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
