import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PayloadDecoderService } from '@app/payload-decoder/payload-decoder.service';
import { BackButton } from '@shared/models/back-button.model';
import { PayloadDecoder, PayloadDecoderBodyResponse } from '@payload-decoder/payload-decoder.model';
import { MeService } from '@shared/services/me.service';
import { DropdownButton } from '@shared/models/dropdown-button.model';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';


@Component({
  selector: 'app-payload-decoder-detail',
  templateUrl: './payload-decoder-detail.component.html',
  styleUrls: ['./payload-decoder-detail.component.scss']
})
export class PayloadDecoderDetailComponent implements OnInit, OnDestroy {
  payloadDecoder: PayloadDecoder;
  public backButton: BackButton = { label: '', routerLink: '/payload-decoder' };
  id: number;
  subscription: Subscription;
  editorJsonOutpuOptions = { theme: 'vs', language: 'json', autoIndent: true, roundedSelection: true, minimap: { enabled: false }, readOnly: true };
  dropdownButton: DropdownButton;
  deleteDialogSubscription: Subscription;
  errorTitle: string;


  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private payloadDecoderService: PayloadDecoderService,
    private router: Router,
    private meService: MeService,
    private deleteDialogService: DeleteDialogService
  ) {
  }

  ngOnInit(): void {
    this.translate.use('da');

    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.getPayloadDecoder(this.id);
      this.dropdownButton = {
        label: '',
        editRouterLink: '../../payload-decoder-edit/' + this.id,
        isErasable: true,
      };
    }
    this.translate.get(['PAYLOAD-DECODER.TITLE', 'PAYLOAD-DECODER.DETAIL.DROPDOWN', 'PAYLOAD-DECODER.DELETE-FAILED'])
      .subscribe(translations => {
        this.backButton.label = translations['PAYLOAD-DECODER.TITLE'];
        this.dropdownButton.label = translations['PAYLOAD-DECODER.DETAIL.DROPDOWN'];
        this.errorTitle = translations['PAYLOAD-DECODER.DELETE-FAILED'];
      });
  }

  canEdit() {
    this.payloadDecoder.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite, this.payloadDecoder?.organizationId);
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
    this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(
      (response) => {
        if (response) {
          this.payloadDecoderService.delete(id).subscribe(
            (response) => {
              if (response.ok && response.body.affected > 0) {
                this.router.navigate(['payload-decoder']);
              } else {
                this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog(
                  response.error.message,
                  false,
                  false,
                  true,
                  this.errorTitle).subscribe();
              }
            },
          );
        } else {
          console.log(response);
        }
      }
    );
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }
}
