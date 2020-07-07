import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../question-base';
import { QuestionControlService } from '../../_services/question-control.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-body-iot-devices',
  templateUrl: './form-body-iot-devices.component.html',
  styleUrls: ['./form-body-iot-devices.component.scss']
})
export class FormBodyIotDevicesComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
