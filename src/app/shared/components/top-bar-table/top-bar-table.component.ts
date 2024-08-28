import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Location } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-top-bar-table",
    templateUrl: "./top-bar-table.component.html",
    styleUrls: ["./top-bar-table.component.scss"],
})
export class TopBarTableComponent implements OnInit {
    @Input() title: string;
    @Input() ctaLabelPrimary: string;
    @Input() ctaRouterLinkPrimary: string;
    @Input() ctaLabelSecondary: string;
    @Input() ctaRouterLinkSecondary: string;
    @Input() ctaActionButtonLabel: string;
    @Input() ctaActionButtonOnClick: Function;
    @Input() component: false;
    @Input() backButtonTitle: string;

    @Input() options: Array<any>;
    @Output() updateSelectedOpt = new EventEmitter();
    selectedOpt: number;
    @Input() addDropdown: false;
    @Input() dropdownLabel: string;
    @Input() dropdownDefaultOption: string;

    constructor(public translate: TranslateService, private location: Location) {
        translate.use("da");
    }

    ngOnInit(): void {}

    routeBack(): void {
        this.location.back();
    }

    setOptionToNull() {
        this.selectedOpt = null;
        this.updateSelectedOpt.emit(this.selectedOpt);
    }

    setOptionToParent() {
        this.updateSelectedOpt.emit(this.selectedOpt);
    }
}
