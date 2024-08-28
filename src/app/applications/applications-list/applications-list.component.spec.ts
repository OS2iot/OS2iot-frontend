import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ApplicationsListComponent } from "./applications-list.component";

describe("ListApplicationsComponent", () => {
    let component: ApplicationsListComponent;
    let fixture: ComponentFixture<ApplicationsListComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ApplicationsListComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
