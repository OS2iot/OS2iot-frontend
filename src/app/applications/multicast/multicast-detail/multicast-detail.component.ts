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

@Component({
  selector: 'app-multicast-detail',
  templateUrl: './multicast-detail.component.html',
  styleUrls: ['./multicast-detail.component.scss'],
})
export class MulticastDetailComponent implements OnInit {
  public multicastSubscription: Subscription;
  public multicast: Multicast;
  public backButton: BackButton = { label: '', routerLink: '/multicast-list' };
  private deleteDialogSubscription: Subscription;
  public dropdownButton: DropdownButton;
  private applicationName: string;
  private applicationId: number;

  constructor(
    private route: ActivatedRoute,
    private deleteDialogService: DeleteDialogService,
    private location: Location,
    private multicastService: MulticastService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('multicastId');
    this.applicationName = this.route.snapshot.paramMap.get('name');
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

  getMulticast(id: number) {
    this.multicastService.get(id).subscribe((multicast: Multicast) => {
      this.multicast = multicast;
      this.setBackButton(this.applicationId);
    });
  }

  private setBackButton(applicationId: number) {
    this.backButton.routerLink = [
      'applications',
      applicationId.toString(),
      'multicast-list',
      this.applicationName,
    ];
  }

  //only if classB can be used
  // canShowPeriodicity(): boolean {
  //   if (this.multicast.groupType === MulticastType.ClassB) {
  //     return true;
  //   } else return false;
  // }

  onDeleteDatatarget() {
    this.deleteDialogSubscription = this.deleteDialogService
      .showSimpleDialog()
      .subscribe((response) => {
        if (response) {
          this.multicastService
            .delete(this.multicast.id)
            .subscribe((response) => {});
          this.location.back();
        } else {
          console.log(response);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }
}
