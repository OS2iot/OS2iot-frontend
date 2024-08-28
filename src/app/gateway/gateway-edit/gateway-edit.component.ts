import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ErrorMessageService } from "@shared/error-message.service";
import { BackButton } from "@shared/models/back-button.model";
import { ScrollToTopService } from "@shared/services/scroll-to-top.service";
import { Subscription } from "rxjs";
import { ChirpstackGatewayService } from "src/app/shared/services/chirpstack-gateway.service";
import { Gateway, GatewayResponse } from "../gateway.model";
import {
  GatewayPlacement,
  GatewayPlacementEntries,
  GatewaySetupStatus,
  GatewayStatusEntries,
} from "@app/gateway/enums/gateway-status-interval.enum";

interface DropdownOption {
  label: string;
  value: string | number;
}

@Component({
  selector: "app-gateway-edit",
  templateUrl: "./gateway-edit.component.html",
  styleUrls: ["./gateway-edit.component.scss"],
})
export class GatewayEditComponent implements OnInit, OnDestroy {
  public backButton: BackButton = { label: "", routerLink: ["gateways"] };
  public title = "";
  public submitButton = "";

  public gatewaySubscription: Subscription;
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public editMode = false;
  private gatewayId: string;

  gateway = new Gateway();

  placements: DropdownOption[] = [];
  statuses: DropdownOption[] = [];

  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService,
    private router: Router,
    private loraGatewayService: ChirpstackGatewayService,
    private errorMessageService: ErrorMessageService,
    private scrollToTopService: ScrollToTopService
  ) {}

  ngOnInit(): void {
    this.translate.use("da");
    this.gatewayId = this.route.snapshot.paramMap.get("id");
    if (this.gatewayId) {
      this.getGateway(this.gatewayId);
      this.editMode = true;
      this.backButton.routerLink = ["gateways", "gateway-detail", this.gatewayId];
    }
    this.translate.get(["NAV.LORA-GATEWAYS", "FORM.EDIT-NEW-GATEWAY", "GATEWAY.SAVE"]).subscribe(translations => {
      this.backButton.label = translations["NAV.LORA-GATEWAYS"];
      this.title = translations["FORM.EDIT-NEW-GATEWAY"];
      this.submitButton = translations["GATEWAY.SAVE"];
    });

    const placementTranslationPrefix = "GATEWAY.PLACEMENT.";
    const placementTranslationKeys = GatewayPlacementEntries.map(x => placementTranslationPrefix + x.key);
    const statusTranslationPrefix = "GATEWAY.STATUS.";
    const statusTranslationKeys = GatewayStatusEntries.map(x => statusTranslationPrefix + x.key);

    this.translate.get([...statusTranslationKeys, ...placementTranslationKeys]).subscribe(translations => {
      const placementOptions: DropdownOption[] = GatewayPlacementEntries.map(entry => ({
        label: translations[placementTranslationPrefix + entry.key],
        value: GatewayPlacement[entry.key],
      }));
      this.placements.push(...placementOptions);
      const statusOptions: DropdownOption[] = GatewayStatusEntries.map(entry => ({
        label: translations[statusTranslationPrefix + entry.key],
        value: GatewaySetupStatus[entry.key],
      }));
      this.statuses.push(...statusOptions);
    });
  }

  getGateway(gatewayId: string): void {
    this.gatewaySubscription = this.loraGatewayService.get(gatewayId).subscribe((result: GatewayResponse) => {
      this.gateway = result.gateway;
    });
  }

  getCoordinates() {
    return {
      longitude: this.gateway.location.longitude,
      latitude: this.gateway.location.latitude,
      draggable: true,
      useGeolocation: !this.editMode,
      editMode: this.editMode,
    };
  }

  createGateway(): void {
    this.gateway.gatewayId = this.gateway.gatewayId?.replace(/[^0-9A-Fa-f]/g, "");
    this.loraGatewayService.post(this.gateway).subscribe(
      response => {
        this.routeBack();
      },
      (error: HttpErrorResponse) => {
        this.showError(error);
        this.formFailedSubmit = true;
      }
    );
  }

  updateGateway(): void {
    // Gateway ID not allowed in update.
    this.gateway.gatewayId = undefined;
    this.loraGatewayService.put(this.gateway, this.gatewayId).subscribe(
      response => {
        this.routeBack();
      },
      error => {
        this.showError(error);
        this.formFailedSubmit = true;
      }
    );
  }

  onSubmit(): void {
    if (this.gatewayId) {
      this.updateGateway();
    } else {
      this.createGateway();
    }
  }

  routeBack(): void {
    this.router.navigateByUrl("/gateways");
  }

  ngOnDestroy() {
    if (this.gatewaySubscription) {
      this.gatewaySubscription.unsubscribe();
    }
  }

  onCoordinateKey(event: any) {
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength);
    }
  }

  updateCoordinates(event: any) {
    this.gateway.location.longitude = event.longitude;
    this.gateway.location.latitude = event.latitude;
  }

  private showError(error: HttpErrorResponse) {
    const errorResponse = this.errorMessageService.handleErrorMessageWithFields(error);
    this.errorFields = errorResponse.errorFields;
    this.errorMessages = errorResponse.errorMessages;
    this.scrollToTopService.scrollToTop();
  }
}
