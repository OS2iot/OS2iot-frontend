import { Component, Input, OnInit } from "@angular/core";
import { OpenDataDkDataset } from "../opendatadk-dataset.model";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-opendatadk-detail",
  templateUrl: "./opendatadk-detail.component.html",
  styleUrls: ["./opendatadk-detail.component.scss"],
  standalone: false,
})
export class OpendatadkDetailComponent implements OnInit {
  @Input() openDataDkDataset: OpenDataDkDataset;
  protected themeText: string;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.get("OPENDATADK.QUESTION.THEME-OPTIONS").subscribe(translation => {
      this.themeText = this.openDataDkDataset.keywords
        ? this.openDataDkDataset.keywords.map(key => translation[key]).join("; ")
        : null;
    });
  }
}
