import { Component, OnInit } from '@angular/core';
import { PayloadDecoder } from '../../../models/payload-decoder';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payload-decoder-detail',
  templateUrl: './payload-decoder-detail.component.html',
  styleUrls: ['./payload-decoder-detail.component.scss']
})
export class PayloadDecoderDetailComponent implements OnInit {



  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.use('da');
  }

}
