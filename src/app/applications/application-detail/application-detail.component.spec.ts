import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ApplicationDetailComponent } from "./application-detail.component";

describe("ApplicationComponent", () => {
    let component: ApplicationDetailComponent;
    let fixture: ComponentFixture<ApplicationDetailComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ApplicationDetailComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
