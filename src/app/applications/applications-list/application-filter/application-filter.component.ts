import { NgFor, NgOptimizedImage } from "@angular/common";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { ApplicationService } from "@applications/application.service";
import { ApplicationStatus, ApplicationStatusCheck } from "@applications/enums/status.enum";
import { ChirpstackGatewayService } from "./../../../shared/services/chirpstack-gateway.service";

import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { ApplicationsFilterService } from "./applications-filter.service";

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
    TranslateModule,
  ],
  templateUrl: "./application-filter.component.html",
  styleUrl: "./application-filter.component.scss",
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ApplicationFilterComponent implements OnInit {
  constructor(
    private applicationService: ApplicationService,
    private filterService: ApplicationsFilterService,
    private sharedVariableService: SharedVariableService,
    public translate: TranslateService,
    public ChirpstackGatewayService: ChirpstackGatewayService
  ) {}
  ngOnInit(): void {
    this.loadOwnerOptions();
    this.ChirpstackGatewayService.getMultiple().subscribe(data => data);
  }

  stateOptions: { label: string; value: ApplicationStatus | "All" }[] = [
    { label: "APPLICATION-FILTER.ALL", value: "All" },
    { label: "APPLICATION-FILTER.NONE", value: ApplicationStatus["NONE"] },
    { label: "APPLICATION-FILTER.IN-OPERATION", value: ApplicationStatus["IN-OPERATION"] },
    { label: "APPLICATION-FILTER.PROJECT", value: ApplicationStatus["PROJECT"] },
    { label: "APPLICATION-FILTER.PROTOTYPE", value: ApplicationStatus["PROTOTYPE"] },
    { label: "APPLICATION-FILTER.OTHER", value: ApplicationStatus["OTHER"] },
  ];

  statusOptions: { label: string; value: ApplicationStatusCheck | "All" }[] = [
    { label: "APPLICATION-FILTER.ALL", value: "All" },
    { label: "APPLICATION-FILTER.ALERT", value: "alert" },
    { label: "APPLICATION-FILTER.STABLE", value: "stable" },
  ];

  ownerOptions: { label: string; value: string | "All" }[] = [];

  loadOwnerOptions(): void {
    this.applicationService
      .getApplicationFilterOptions(this.sharedVariableService.getSelectedOrganisationId())
      .subscribe(options => {
        const optionsArray: { label: string; value: string }[] = [];
        options.forEach(option => optionsArray.push({ label: option, value: option }));
        this.ownerOptions = optionsArray;
      });
  }

  state: string = "All";
  status: string = "All";
  owner: string = "All";

  onStatusCheck(event: any): void {
    this.filterService.updateStatusCheck(event.value);
  }

  onStatus(event: any): void {
    this.filterService.updateStatus(event.value);
  }

  onOwner(event: any): void {
    this.filterService.updateOwner(event.value);
  }

  onButtonClick() {
    this.state = "All";
    this.status = "All";
    this.owner = "All";
    this.filterService.resetFilter();
  }
}
