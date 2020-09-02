import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BackButton } from 'src/app/models/back-button';
import { Application } from 'src/app/models/application';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() backButton: BackButton;
  @Input() formType: 'application' | 'iotDevice' | 'loraGateway';
  @Input() title: string;
  @Input() submitButton: string;
  @Input() application: Application;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
