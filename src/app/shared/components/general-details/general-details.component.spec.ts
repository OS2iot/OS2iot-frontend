import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { GeneralDetailsComponent } from "./general-details.component";

describe("GeneralDetailsComponent", () => {
    let component: GeneralDetailsComponent;
    let fixture: ComponentFixture<GeneralDetailsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [GeneralDetailsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GeneralDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
