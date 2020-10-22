import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PayloadDecoderService } from '@app/payload-decoder/payload-decoder.service';
import { BackButton } from '@shared/models/back-button.model';
import { QuickActionButton } from '@shared/models/quick-action-button.model';
import { PayloadDecoder } from '@payload-decoder/payload-decoder.model';

@Component({
  selector: 'app-payload-decoder-detail',
  templateUrl: './payload-decoder-detail.component.html',
  styleUrls: ['./payload-decoder-detail.component.scss']
})
export class PayloadDecoderDetailComponent implements OnInit {

  payloadDecoder: PayloadDecoder;
  public backButton: BackButton = { label: '', routerLink: '/datatarget-list' };
  public buttons: QuickActionButton[] = [
    {
      label: 'PAYLOAD-DECODER.DELETE',
      type: 'delete',
    },
    {
      label: 'PAYLOAD-DECODER.EDIT',
      type: 'edit',
    },
  ];
  id: number;
  subscription: Subscription;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private payloadDecoderService: PayloadDecoderService,
  ) {
  }

  ngOnInit(): void {
    this.translate.use('da');

    this.translate.get(['PAYLOAD-DECODER.TITLE'])
      .subscribe(translations => {
        this.backButton.label = translations['PAYLOAD-DECODER.TITLE'];
      });
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.getPayloadDecoder(this.id);
    }
  }

  private getPayloadDecoder(id: number) {
    this.subscription = this.payloadDecoderService.getOne(id)
      .subscribe(
        (response) => {
          this.payloadDecoder = response;
        });
  }

}
