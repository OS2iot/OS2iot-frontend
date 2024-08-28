import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BackButton } from "@shared/models/back-button.model";

@Component({
    selector: "app-application-edit",
    templateUrl: "./application-edit.component.html",
    styleUrls: ["./application-edit.component.scss"],
})
export class ApplicationEditComponent implements OnInit {
    public backButton: BackButton = { label: "", routerLink: "applications" };
    public multiPage = false;
    public title = "";
    public sectionTitle = "";
    public submitButton = "";
    private applicaitonId: string;

    constructor(public translate: TranslateService, private route: ActivatedRoute) {
        translate.use("da");
    }

    ngOnInit(): void {
        this.translate
            .get(["NAV.APPLICATIONS", "FORM.EDIT-NEW-APPLICATION", "APPLICATION.SAVE"])
            .subscribe(translations => {
                this.backButton.label = translations["NAV.APPLICATIONS"];
                this.title = translations["FORM.EDIT-NEW-APPLICATION"];
                this.submitButton = translations["APPLICATION.SAVE"];
            });
        this.applicaitonId = this.route.snapshot.paramMap.get("id");
        if (this.applicaitonId) {
            this.setBackButton(this.applicaitonId);
        }
    }

    private setBackButton(applicationId: string) {
        this.backButton.routerLink = ["applications", applicationId];
    }
}
