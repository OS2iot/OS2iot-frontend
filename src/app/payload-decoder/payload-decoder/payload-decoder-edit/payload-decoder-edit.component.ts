import { Component, OnInit, Input } from '@angular/core';
import { PayloadDecoder } from 'src/app/models/payload-decoder';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payload-decoder-edit',
  templateUrl: './payload-decoder-edit.component.html',
  styleUrls: ['./payload-decoder-edit.component.scss']
})
export class PayloadDecoderEditComponent implements OnInit {

  @Input() submitButton: string;
  payloadDecoder = new PayloadDecoder();
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public form: FormGroup;

  constructor(
    private translate: TranslateService,
    private location: Location) { }

  ngOnInit(): void {
    this.translate.use('da');
  }

  onSubmit(): void {
  }

  routeBack(): void {
    this.location.back();
  }


}
