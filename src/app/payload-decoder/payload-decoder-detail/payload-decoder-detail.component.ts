import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PayloadDecoderService } from '@app/payload-decoder/payload-decoder.service';
import { BackButton } from '@shared/models/back-button.model';
import { PayloadDecoderBodyResponse } from '@payload-decoder/payload-decoder.model';
import { MeService } from '@shared/services/me.service';


@Component({
  selector: 'app-payload-decoder-detail',
  templateUrl: './payload-decoder-detail.component.html',
  styleUrls: ['./payload-decoder-detail.component.scss']
})
export class PayloadDecoderDetailComponent implements OnInit {
  @Output() deletePayloadDecoder = new EventEmitter();
  payloadDecoder: PayloadDecoderBodyResponse;
  public backButton: BackButton = { label: '', routerLink: '/datatarget-list' };
  id: number;
  subscription: Subscription;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private payloadDecoderService: PayloadDecoderService,
    private router: Router,
    private meService: MeService
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

  canEdit() {
    this.payloadDecoder.canEdit = this.meService.canWriteInTargetOrganization(this.payloadDecoder?.organization?.id);
  }

  private getPayloadDecoder(id: number) {
    this.subscription = this.payloadDecoderService.getOne(id)
      .subscribe(
        (response) => {
          this.payloadDecoder = response;
          this.canEdit();
        });
  }

  onDeletePayload() {
    const id = this.payloadDecoder.id;
    this.payloadDecoderService.delete(id).subscribe((response) => {
      if (response.ok && response.body.affected > 0) {
        this.deletePayloadDecoder.emit(id);
      }
    });
    this.router.navigate(['payload-decoder']);
  }


}
