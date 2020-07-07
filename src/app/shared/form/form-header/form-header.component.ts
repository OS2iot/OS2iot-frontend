import { Component, OnInit, Input } from '@angular/core';
import { BackButton } from 'src/app/models/back-button';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {
  @Input() backButton: BackButton;
  @Input() formType: 'application' | 'iotDevice';
  @Input() title: string;

  constructor(public translate: TranslateService) {
    translate.use('da');
  }

  ngOnInit(): void {
  }

}
