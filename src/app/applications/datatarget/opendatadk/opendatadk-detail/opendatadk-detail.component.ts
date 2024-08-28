import { Component, Input, OnInit } from "@angular/core";
import { OpenDataDkDataset } from "../opendatadk-dataset.model";

@Component({
    selector: "app-opendatadk-detail",
    templateUrl: "./opendatadk-detail.component.html",
    styleUrls: ["./opendatadk-detail.component.scss"],
})
export class OpendatadkDetailComponent implements OnInit {
    @Input() openDataDkDataset: OpenDataDkDataset;

    constructor() {}

    ngOnInit(): void {}
}
