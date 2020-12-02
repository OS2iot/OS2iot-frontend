import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorMessageService } from '@shared/error-message.service';
import { BackButton } from '@shared/models/back-button.model';
import { ScrollToTopService } from '@shared/services/scroll-to-top.service';
import { Subscription } from 'rxjs';
import { ChirpstackGatewayService } from 'src/app/shared/services/chirpstack-gateway.service';
import { Gateway, GatewayResponse } from '../gateway.model';

@Component({
  selector: 'app-gateway-edit',
  templateUrl: './gateway-edit.component.html',
  styleUrls: ['./gateway-edit.component.scss']
})
export class GatewayEditComponent implements OnInit, OnDestroy {

  public backButton: BackButton = { label: '', routerLink: ['gateways'] };
  public multiPage = false;
  public title = '';
  public sectionTitle = '';
  public submitButton = '';

  public gatewaySubscription: Subscription;
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public editMode = false;
  private id: string;

  gateway = new Gateway();

  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService,
    private router: Router,
    private loraGatewayService: ChirpstackGatewayService,
    private errorMessageService: ErrorMessageService,
    private scrollToTopService: ScrollToTopService
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getGateway(this.id);
      this.editMode = true;
      this.backButton.routerLink = ['gateways', 'gateway-detail', this.id]
    }
    this.translate.get(['NAV.LORA-GATEWAYS', 'FORM.EDIT-NEW-GATEWAY', 'GATEWAY.SAVE'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.LORA-GATEWAYS'];
        this.title = translations['FORM.EDIT-NEW-GATEWAY'];
        this.submitButton = translations['GATEWAY.SAVE'];
      });
  }

  getGateway(id: string): void {
    this.gatewaySubscription = this.loraGatewayService
      .get(id)
      .subscribe((result: GatewayResponse) => {
        result.gateway.tagsString = JSON.stringify(result.gateway.tags);
        this.gateway = result.gateway;
      });
  }

  getCoordinates() {
    return {
      longitude: this.gateway.location.longitude,
      latitude: this.gateway.location.latitude,
      draggable: true,
      useGeolocation: !this.editMode,
      editMode: this.editMode
    };
  }

  createGateway(): void {
    this.loraGatewayService.post(this.gateway)
      .subscribe(
        (response) => {
          this.routeBack();
        },
        (error: HttpErrorResponse) => {
          this.showError(error);
        }
      );
  }

  updateGateway(): void {
    // Gateway ID not allowed in update.
    this.gateway.id = undefined;
    this.loraGatewayService
      .put(this.gateway, this.id)
      .subscribe(
        (response) => {
          this.routeBack();
        },
        (error) => {
          this.showError(error);
        });
  }

  onSubmit(): void {
    if (this.id) {
      this.updateGateway();
    } else {
      this.createGateway();
    }
  }

  routeBack(): void {
    this.router.navigateByUrl('/gateways');
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
