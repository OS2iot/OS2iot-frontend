import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BackButton } from 'src/app/models/back-button';
import { Gateway, GatewayResponse } from 'src/app/models/gateway';
import { ChirpstackGatewayService } from 'src/app/shared/services/chirpstack-gateway.service';

@Component({
  selector: 'app-gateway-edit',
  templateUrl: './gateway-edit.component.html',
  styleUrls: ['./gateway-edit.component.scss']
})
export class GatewayEditComponent implements OnInit, OnDestroy {

  public backButton: BackButton = { label: '', routerLink: '/gateways' };
  public multiPage = false;
  public title = '';
  public sectionTitle = '';
  public submitButton = '';

  public gatewaySubscription: Subscription;
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  private id: string;

  gateway = new Gateway();

  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService,
    private router: Router,
    private loraGatewayService: ChirpstackGatewayService
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getGateway(this.id);
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

  createGateway(): void {
    this.loraGatewayService.post(this.gateway)
      .subscribe(
        (response) => {
          console.log(response);
          this.routeBack();
        },
        (error: HttpErrorResponse) => {
          this.showError(error);
        }
      );
  }

  updateGateway(): void {
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
    console.log(event.target.value);
    console.log(event.target.maxLength);
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength);
    }
  }

  private showError(error: HttpErrorResponse) {
    this.errorFields = [];
    this.errorMessages = [];
    if (error.error?.message?.length > 0) {
      error.error.message[0].children.forEach((err) => {
        this.errorFields.push(err.property);
        this.errorMessages = this.errorMessages.concat(
          Object.values(err.constraints)
        );
      });
    } else {
      this.errorMessage = error.message;
    }
    this.formFailedSubmit = true;
  }

}
