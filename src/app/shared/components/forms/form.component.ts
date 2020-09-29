import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BackButton } from 'src/app/models/back-button';
import { Application } from '@applications/application.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  @Input() backButton: BackButton;
  @Input() formType: 'application' | 'iotDevice' | 'gateways';
  @Input() title: string;
  @Input() submitButton: string;
  @Input() application: Application;

  constructor() {
  }

  ngOnInit(): void {
  }

}
