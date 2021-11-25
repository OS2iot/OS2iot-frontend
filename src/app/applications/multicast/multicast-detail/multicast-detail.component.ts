import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { BackButton } from '@shared/models/back-button.model';
import { DropdownButton } from '@shared/models/dropdown-button.model';
import { Subscription } from 'rxjs';
import { Multicast } from '../multicast.model';
import { Location } from '@angular/common';
import { MulticastService } from '../multicast.service';
import { SnackService } from '@shared/services/snack.service';

@Component({
  selector: 'app-multicast-detail',
  templateUrl: './multicast-detail.component.html',
  styleUrls: ['./multicast-detail.component.scss'],
})
export class MulticastDetailComponent implements OnInit {
  public multicast: Multicast;
  public backButton: BackButton = { label: '', routerLink: '/multicast-list' };
  private deleteDialogSubscription: Subscription;
  public dropdownButton: DropdownButton;
  private applicationId: number;

  constructor(
    private route: ActivatedRoute,
    private deleteDialogService: DeleteDialogService,
    private location: Location,
    private multicastService: MulticastService,
    public translate: TranslateService,
    public snackService: SnackService
  ) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('multicastId'); // the multicastId is a string, created by chirpstack.
    if (id) {
      this.getMulticast(id);
      this.dropdownButton = {
        label: '',
        editRouterLink: '../../multicast-edit/' + id,
        isErasable: true,
      };
      this.applicationId = +this.route.snapshot.paramMap.get('id');
    }
    this.translate
      .get(['GEN.BACK', 'MULTICAST-TABLE-ROW.SHOW-OPTIONS'])
      .subscribe((translations) => {
        this.backButton.label = translations['GEN.BACK'];
        this.dropdownButton.label =
          translations['MULTICAST-TABLE-ROW.SHOW-OPTIONS'];
      });
  }

  getMulticast(id: string) {
    this.multicastService.get(id).subscribe((multicast: Multicast) => {
      this.multicast = multicast;
      this.setBackButton(this.applicationId);
    });
  }

  private setBackButton(applicationId: number) {
    this.backButton.routerLink = [
      'applications',
      applicationId.toString()
    ];
  }

  //only if classB can be used
  // canShowPeriodicity(): boolean {
  //   if (this.multicast.groupType === MulticastType.ClassB) {
  //     return true;
  //   } else return false;
  // }

  onDeleteMulticast() {
    this.deleteDialogSubscription = this.deleteDialogService
      .showSimpleDialog()
      .subscribe((response) => {
        if (response) {
          this.multicastService
            .delete(this.multicast.multicastId)
            .subscribe((response) => {
              if (response.status !== 0) {
                this.showDeletedSnack();
                this.location.back();
              }
              else{
                this.showFailSnack();
              }
            });
        } else {
          console.log(response);
        }
      });
  }

  showDeletedSnack(): void {
    this.snackService.showDeletedSnack();
  }

  showFailSnack(): void{
    this.snackService.showFailSnack();
  }

  ngOnDestroy(): void {
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }
}
