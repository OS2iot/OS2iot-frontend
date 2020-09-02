import { Component, OnInit, Input } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { BackButton } from 'src/app/models/back-button';

import { Step } from 'src/app/models/step';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {
  @Input() backButton: BackButton;
  @Input() title: string;
  public steps: Step[] = [];
  public stepTitle: string = '';
  public activeStep: string = '';

  constructor(public translate: TranslateService, public location: Location) {
    translate.use('da');
  }

  ngOnInit(): void {
  }

  routeBack(): void {
    this.location.back()
  }

}
