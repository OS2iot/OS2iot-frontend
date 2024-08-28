import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-permission",
    templateUrl: "./permission.component.html",
    styleUrls: ["./permission.component.scss"],
})
export class PermissionComponent implements OnInit {
    constructor(public translate: TranslateService) {
        translate.use("da");
    }
    ngOnInit(): void {}
}
