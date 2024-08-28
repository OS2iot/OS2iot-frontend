import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatatargetTypeDescriptor } from "../datatarget.model";
import { DatatargetTypesService } from "../datatarget-types.service";

@Component({
    selector: "app-datatarget-new",
    templateUrl: "./datatarget-new.component.html",
    styleUrls: ["./datatarget-new.component.scss"],
})
export class DatatargetNewComponent implements OnInit {
    public title = "";
    public sectionTitle = "";
    public backButtonTitle = "";
    public submitButton = "";
    public avaiableDataTargetTypes: DatatargetTypeDescriptor[];

    constructor(
        public translate: TranslateService,
        private route: ActivatedRoute,
        private router: Router,
        private dataTargetTypesService: DatatargetTypesService
    ) {
        translate.use("da");
    }

    ngOnInit() {
        this.translate
            .get(["FORM.CREATE-NEW-DATATARGET", "FORM.EDIT-DATATARGET", "DATATARGET.SAVE", "NAV.DATATARGET"])
            .subscribe(translations => {
                const datatargetid = +this.route.snapshot.paramMap.get("datatargetId");
                if (datatargetid !== 0) {
                    this.title = translations["FORM.EDIT-DATATARGET"];
                } else {
                    this.title = translations["FORM.CREATE-NEW-DATATARGET"];
                }
                this.submitButton = translations["DATATARGET.SAVE"];
                this.backButtonTitle = translations["NAV.DATATARGET"];
            });

        this.avaiableDataTargetTypes = this.dataTargetTypesService.getAvailableDataTargetTypes();
    }

    public createNewOf(typeDescriptor: DatatargetTypeDescriptor) {
        this.router.navigate(["../datatarget-edit", { datatargetType: typeDescriptor.type }], {
            relativeTo: this.route,
        });
    }
    public showReadMe(typeDescriptor: DatatargetTypeDescriptor) {
        window.open(typeDescriptor.readMoreUrl, "_blank");
    }
}
