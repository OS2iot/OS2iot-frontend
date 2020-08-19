import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { Gateway } from '../../../../app/models/gateway'
import { QuestionBase } from 'src/app/models/question-base';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ChirpstackGatewayService } from '../../_services/chirpstack-gateway.service';
import { QuestionControlService } from '../../_services/question-control.service';

@Component({
  selector: 'app-form-body-lora-gateway',
  templateUrl: './form-body-lora-gateway.component.html',
  styleUrls: ['./form-body-lora-gateway.component.scss'],
  providers: [QuestionControlService],
})
export class FormBodyLoraGatewayComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  @Input() submitButton: string;
  public form: FormGroup;
  public payLoad = '';
  public gatewaySubscription: Subscription;
  public id: number;
  public errorMessages: any;
  public errorFields: string[];

  constructor(
    private qcs: QuestionControlService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private router: Router,
    private loraGatewayService: ChirpstackGatewayService
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.form = this.qcs.toFormGroup(this.questions);
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) {
        this.getGateway(this.id);
    }
  }

  getGateway(id: number): void {
    this.gatewaySubscription = this.loraGatewayService
        .get(id)
        .subscribe((gateway: any) => {
          this.form.controls['name'].setValue(gateway.name);
          this.form.controls['description'].setValue(
              gateway.description
          );
        });
  }

  createGateway(): void {
    this.loraGatewayService.post(JSON.stringify(this.form.getRawValue()))
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigateByUrl('/mine-lora-gateways')
        },
        (error: HttpErrorResponse) => {
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
      )
  }

  updateGateway(): void {
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

}
