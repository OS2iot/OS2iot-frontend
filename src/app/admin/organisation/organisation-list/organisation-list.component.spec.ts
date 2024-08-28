import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { OrganisationListComponent } from "./organisation-list.component";

describe("OrganisationListComponent", () => {
    let component: OrganisationListComponent;
    let fixture: ComponentFixture<OrganisationListComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [OrganisationListComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrganisationListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
