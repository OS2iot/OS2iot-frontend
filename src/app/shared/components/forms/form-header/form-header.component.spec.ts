import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { FormHeaderComponent } from "./form-header.component";

describe("FormHeaderComponent", () => {
    let component: FormHeaderComponent;
    let fixture: ComponentFixture<FormHeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FormHeaderComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
