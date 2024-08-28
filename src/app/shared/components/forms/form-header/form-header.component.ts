import { Component, OnInit, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Location } from "@angular/common";
import { BackButton } from "@shared/models/back-button.model";
import { Step } from "@shared/models/step.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-form-header",
  templateUrl: "./form-header.component.html",
  styleUrls: ["./form-header.component.scss"],
})
export class FormHeaderComponent implements OnInit {
  @Input() backButton: BackButton;
  @Input() title: string;
  public steps: Step[] = [];
  public stepTitle: string = "";
  public activeStep: string = "";

  constructor(public translate: TranslateService, public location: Location, private router: Router) {
    translate.use("da");
  }

  ngOnInit(): void {}

  routeBack(): void {
    if (this.backButton?.routerLink && Array.isArray(this.backButton.routerLink)) {
      this.router.navigate(this.backButton.routerLink);
    } else if (this.backButton?.routerLink && typeof this.backButton.routerLink === "string") {
      this.router.navigate([this.backButton.routerLink]);
    } else {
      this.location.back();
    }
  }
}
