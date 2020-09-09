import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PayloadDecoder } from 'src/app/models/payload-decoder';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tr[app-payload-decoder-row]',
  templateUrl: './payload-decoder-row.component.html',
  styleUrls: ['./payload-decoder-row.component.scss']
})
export class PayloadDecoderRowComponent implements OnInit {

  @Input() payloadDecoder: PayloadDecoder;
  @Output() deletePayloadDecoder = new EventEmitter();
  private alertMessage: string;

  constructor(
    public translate: TranslateService,
    private router: Router
    ) {
      translate.use('da');
  }

  ngOnInit(): void {
  }

  clickDelete() {
    if (!this.payloadDecoder) {
        this.deletePayloadDecoder.emit(this.payloadDecoder.id);
    }
  }

  navigateToEditPage() {
    this.router.navigate(['payload-decoder-edit', this.payloadDecoder.id]);
}

}
