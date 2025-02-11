import { NgFor, NgOptimizedImage } from "@angular/common";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { ApplicationService } from "@applications/application.service";
import { ApplicationState, ApplicationStatus } from "@applications/enums/status.enum";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { ApplicationsFilterService } from "../applications-filter.service";

@Component({
  selector: "app-application-filter",
  standalone: true,
  imports: [
    NgFor,
    NgOptimizedImage,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
  ],
  templateUrl: "./application-filter.component.html",
  styleUrl: "./application-filter.component.scss",
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ApplicationFilterComponent implements OnInit {
  constructor(
    private applicationService: ApplicationService,
    private filterService: ApplicationsFilterService,
    private sharedVariableService: SharedVariableService
  ) {}
  ngOnInit(): void {
    this.sharedVariableService.getValue().subscribe(organizationId => {
      this.loadOwnerOptions(organizationId);
    });
  }

  stateOptions: { label: string; value: ApplicationState | "All" }[] = [
    { label: "Alle", value: "All" },
    { label: "Ingen", value: ApplicationState["NONE"] },
    { label: "In operation", value: ApplicationState["IN-OPERATION"] },
    { label: "Project", value: ApplicationState["PROJECT"] },
    { label: "Prototype", value: ApplicationState["PROTOTYPE"] },
    { label: "other", value: ApplicationState["OTHER"] },
  ];

  statusOptions: { label: string; value: ApplicationStatus | "All" }[] = [
    { label: "Alle", value: "All" },
    { label: "Alert", value: ApplicationStatus.WARNING },
    { label: "Stable", value: ApplicationStatus.STABLE },
  ];

  ownerOptions: { label: string; value: string | "All" }[] = [];

  loadOwnerOptions(orgId: number): void {
    this.applicationService.getApplicationFilterOptions(orgId).subscribe(options => {
      console.log(options);
      const optionsArray: { label: string; value: string }[] = [{ label: "Alle", value: "All" }];
      options.forEach(option => optionsArray.push({ label: option, value: option }));
      this.ownerOptions = optionsArray;
    });
  }

  state: string = "All";
  status: string = "All";
  owner: string = "All";

  onState(event: any): void {
    console.log("Tilstand changed:", event.value);
    this.filterService.updateState(event.value);
  }

  onStatus(event: any): void {
    console.log("Status changed:", event.value);
    this.filterService.updateStatus(event.value);
  }

  onOwner(event: any): void {
    console.log("Ejer changed:", event.value);
    this.filterService.updateOwner(event.value);
  }

  onButtonClick() {
    this.state = "All";
    this.status = "All";
    this.owner = "All";
    this.filterService.resetFilter();
  }
}
