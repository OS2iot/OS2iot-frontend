import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-organisation",
    templateUrl: "./organisation.component.html",
    styleUrls: ["./organisation.component.scss"],
})
export class OrganisationComponent implements OnInit {
    constructor(public translate: TranslateService) {
        translate.use("da");
    }

    ngOnInit(): void {}
}
