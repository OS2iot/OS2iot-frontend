import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { QuestionControlService } from '../../_services/question-control.service';
import { QuestionBaseMulti } from '../question-base';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RestService } from '../../_services/rest.service';

import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-body-iot-devices',
  templateUrl: './form-body-iot-devices.component.html',
  styleUrls: ['./form-body-iot-devices.component.scss'],
  providers: [QuestionControlService],
})
export class FormBodyIotDevicesComponent implements OnInit, OnDestroy {
  @Input() questions: QuestionBaseMulti<any>[] = [];
  public forms: FormGroup[] = [];
  public payLoad = '';
  public iotDevicesSubscription: Subscription;
  public activeStepIndex: number;
  public formData: any;
  public formFields: Array<Array<string>>;
  public masterFormFields: Array<string>;
  public stepItems: Array<any>;
  public currentFormContent: Array<any>;
  private id: number;

  constructor(
    private qcs: QuestionControlService,
    private restService: RestService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.activeStepIndex = 0;
    this.currentFormContent = [];
    this.formFields = [];
    this.stepItems = this.questions;

    console.log('questions', this.questions);
    this.translate.use('da');
    this.id = +this.route.snapshot.paramMap.get('id');
    this.questions.forEach(question => {
      this.forms.push(this.qcs.toFormGroup(question.data));
    });
    if (this.id) {
      this.getApplications(this.id);
    }
    console.log('forms', this.forms);
  }

  getApplications(id: number): void {
      this.iotDevicesSubscription = this.restService
          .get('iot-device', {}, id)
          .subscribe((iotDevice) => {
              // this.form.controls['name'].setValue(iotDevice.name);
              // this.form.controls['description'].setValue(iotDevice.description);
          });
  }

  onSubmit() {
    // this.payLoad = JSON.stringify(this.form.getRawValue());
  }
  
  routeBack() {
    this.router.navigateByUrl('/alle-iot-enheder');
  }

  trackByFn(index: number): number {
    return index;
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.iotDevicesSubscription) {
        this.iotDevicesSubscription.unsubscribe();
    }
}
}
