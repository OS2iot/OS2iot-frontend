import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { Gateway } from '../../../../app/models/gateway'
<<<<<<< HEAD
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ChirpstackGatewayService } from '../../_services/chirpstack-gateway.service';
=======
import { QuestionBase } from 'src/app/models/question-base';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ChirpstackGatewayService } from '../../_services/chirpstack-gateway.service';
import { QuestionControlService } from '../../_services/question-control.service';
>>>>>>> 3ee7b3c843dc961636720e3d5594eb6b515a1f20

@Component({
  selector: 'app-form-body-lora-gateway',
  templateUrl: './form-body-lora-gateway.component.html',
<<<<<<< HEAD
  styleUrls: ['./form-body-lora-gateway.component.scss']
})
export class FormBodyLoraGatewayComponent implements OnInit {

=======
  styleUrls: ['./form-body-lora-gateway.component.scss'],
  providers: [QuestionControlService],
})
export class FormBodyLoraGatewayComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
>>>>>>> 3ee7b3c843dc961636720e3d5594eb6b515a1f20
  @Input() submitButton: string;
  public form: FormGroup;
  public payLoad = '';
  public gatewaySubscription: Subscription;
<<<<<<< HEAD
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit: boolean = false;
  private id: string;

  gateway = new Gateway();

  constructor(
=======
  public id: number;
  public errorMessages: any;
  public errorFields: string[];

  constructor(
    private qcs: QuestionControlService,
>>>>>>> 3ee7b3c843dc961636720e3d5594eb6b515a1f20
    private route: ActivatedRoute,
    public translate: TranslateService,
    private router: Router,
    private loraGatewayService: ChirpstackGatewayService
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
<<<<<<< HEAD
    this.id = this.route.snapshot.paramMap.get('id');
=======
    this.form = this.qcs.toFormGroup(this.questions);
    this.id = +this.route.snapshot.paramMap.get('id');
>>>>>>> 3ee7b3c843dc961636720e3d5594eb6b515a1f20
    if (this.id) {
        this.getGateway(this.id);
    }
  }

<<<<<<< HEAD
  getGateway(id: string): void {
    this.gatewaySubscription = this.loraGatewayService
        .get()
        .subscribe((result: any) => {
          this.gateway = result.result[0]
=======
  getGateway(id: number): void {
    this.gatewaySubscription = this.loraGatewayService
        .get()
        .subscribe((gateway: any) => {
          this.form.controls['name'].setValue(gateway.name);
          this.form.controls['description'].setValue(
              gateway.description
          );
>>>>>>> 3ee7b3c843dc961636720e3d5594eb6b515a1f20
        });
  }

  createGateway(): void {
<<<<<<< HEAD
    this.loraGatewayService.post(this.gateway)
=======
    this.loraGatewayService.post(JSON.stringify(this.form.getRawValue()))
>>>>>>> 3ee7b3c843dc961636720e3d5594eb6b515a1f20
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigateByUrl('/mine-lora-gateways')
        },
        (error: HttpErrorResponse) => {
<<<<<<< HEAD
          this.showError(error)
        }
=======
          console.log('not ok', error.error);
          this.errorFields = [];
          this.errorMessages = [];
          error.error.message.forEach((err) => {
              this.errorFields.push(err.property);
              console.log('is array', Object.values(err.constraints));
              this.errorMessages = this.errorMessages.concat(
                  Object.values(err.constraints)
              );
          });

          console.log('questions', this.questions);
          this.questions.forEach((question) => {
              this.errorFields.includes(question.key) ? (question.error = true) : (question.error = false);
          });
          console.log('errorFields', this.errorFields);
      }
>>>>>>> 3ee7b3c843dc961636720e3d5594eb6b515a1f20
      )
  }

  updateGateway(): void {
<<<<<<< HEAD
    this.loraGatewayService
      .put(this.gateway, this.id)
      .subscribe(
        (response) => {
          
            this.router.navigateByUrl('/mine-applikationer');
        },
        (error) => {
          this.showError(error)
        })
  }

  onSubmit(): void {
=======
    this.loraGatewayService.put(JSON.stringify(this.form.getRawValue()), this.id).subscribe((response) =>
      {
        if (response.ok) {
          this.router.navigateByUrl('/mine-applikationer');
        } else {
            // TODO: MESSAGE SHOW ERRORS
        }
      })
  }

  onSubmit(): void {
    this.payLoad = JSON.stringify(this.form.getRawValue());

>>>>>>> 3ee7b3c843dc961636720e3d5594eb6b515a1f20
    if (this.id) {
        this.updateGateway();
    } else {
        this.createGateway();
    }
  }

  routeBack(): void {
    this.router.navigateByUrl('/mine-lora-gateways');
  }

  ngOnDestroy() {
      if (this.gatewaySubscription) {
          this.gatewaySubscription.unsubscribe();
      }
  }

<<<<<<< HEAD
  onCoordinateKey(event: any) {
    console.log(event.target.value);
    console.log(event.target.maxLength);
    if (event.target.value.length > event.target.maxLength)
        event.target.value = event.target.value.slice(
            0,
            event.target.maxLength
        );
}

  private showError(error: HttpErrorResponse) {
    this.errorFields = [];
    this.errorMessages = [];
    error.error.message.forEach((err) => {
        this.errorFields.push(err.property);
        this.errorMessages = this.errorMessages.concat(
            Object.values(err.constraints)
        );
    });
    this.formFailedSubmit = true;
  }
=======
>>>>>>> 3ee7b3c843dc961636720e3d5594eb6b515a1f20
}
