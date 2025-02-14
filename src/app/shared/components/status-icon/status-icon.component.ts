import { Component, Input } from "@angular/core";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DomSanitizer } from "@angular/platform-browser";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-status-icon",
  templateUrl: "./status-icon.component.html",
  styleUrls: ["./status-icon.component.scss"],
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, TranslateModule],
})
export class StatusIconComponent {
  constructor(
    private translate: TranslateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "alert-icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/alert.svg"),
      {}
    );

    this.matIconRegistry.addSvgIcon(
      "stable-icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/stable.svg"),
      {}
    );
  }
  @Input() iconType: "alert" | "stable" = "stable";
}
