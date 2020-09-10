import { Component, OnInit } from '@angular/core';
import { PayloadDecoder } from '../../payload-decoder.model';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from 'src/app/models/back-button';
import { QuickActionButton } from 'src/app/models/quick-action-button';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PayloadDecoderService } from 'src/app/shared/services/payload-decoder.service';

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
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.getPayloadDecoder(this.id);
    }
  }

  private getPayloadDecoder(id: number) {
    this.subscription =  this.payloadDecoderService.getOne(id)
      .subscribe(
        (response) => {
        this.payloadDecoder = response;
    });
  }

  /* fetchData() {
    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('payloadDecoders');
        }),
        map(payloadDecodersState => {
          return payloadDecodersState.payloadDecoders.find((payloadDecoder, index) => {
            return payloadDecoder.id === this.id;
          });
        })
      )
      .subscribe(payloadDecoder => {
        this.payloadDecoder = payloadDecoder;
      });
  } */

}
