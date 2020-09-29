import { Component, OnInit, Input } from '@angular/core';
import { BackButton } from '@shared/models/back-button.model';
import { Application } from '@app/applications/application.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  @Input() backButton: BackButton;
  @Input() formType: 'application';
  @Input() title: string;
  @Input() submitButton: string;
  @Input() application: Application;

  constructor() {
  }

  ngOnInit(): void {
  }

}
