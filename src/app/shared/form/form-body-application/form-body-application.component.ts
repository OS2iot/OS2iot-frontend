import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../question-base';
import { QuestionControlService } from '../../_services/question-control.service';
import { FormGroup } from '@angular/forms';
import { RestService } from '../../_services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-body-application',
  templateUrl: './form-body-application.component.html',
  styleUrls: ['./form-body-application.component.scss'],
  providers: [ QuestionControlService ]
})
export class FormBodyApplicationComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] = [];
  public form: FormGroup;
  public payLoad = '';


  constructor(
    private qcs: QuestionControlService,
    private restService: RestService,
    private router: Router)
    {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());

    this.restService
    .create('application', JSON.stringify(this.form.getRawValue())
    )
    .subscribe(application => {
        console.log(JSON.stringify(this.form.getRawValue()));
    });
  }

}
