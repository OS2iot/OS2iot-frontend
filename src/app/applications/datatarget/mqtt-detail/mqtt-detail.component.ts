import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatatargetDetail } from '@applications/datatarget/datatarget-detail/datatarget-detail';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { PayloadDeviceDatatargetGetByDataTarget } from '@payload-decoder/payload-device-data.model';
import { PayloadDeviceDatatargetService } from '@payload-decoder/payload-device-datatarget.service';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { BackButton } from '@shared/models/back-button.model';
import { DropdownButton } from '@shared/models/dropdown-button.model';
import { Subscription } from 'rxjs';
import { Datatarget } from '../datatarget.model';
import { DatatargetService } from '../datatarget.service';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-mqtt-detail',
  templateUrl: './mqtt-detail.component.html',
  styleUrls: ['./mqtt-detail.component.scss'],
})
// TODO: Most of the code is duplicated from other datatarget edit components.
// Same applies to the html file. One solution is extending a base datatarget-edit component
export class MqttDetailComponent
  implements DatatargetDetail, OnInit, OnDestroy {
  public datatarget: Datatarget;
  public backButton: BackButton = { label: '', routerLink: undefined };
  public dataTargetRelations: PayloadDeviceDatatargetGetByDataTarget[];
  private deleteDialogSubscription: Subscription;
  public dropdownButton: DropdownButton;
  arrowsAltH = faArrowsAltH;
  canEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private deleteDialogService: DeleteDialogService,
    private location: Location,
    private datatargetRelationService: PayloadDeviceDatatargetService,
    private datatargetService: DatatargetService,
    public translate: TranslateService,
    private meService: MeService
  ) {}

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('datatargetId');
    const appId: number = +this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getDatatarget(id);
      this.getDatatargetRelations(id);
      this.dropdownButton = {
        label: '',
        editRouterLink: '../../datatarget-edit/' + id,
        isErasable: true,
      };
    }
    this.translate
      .get(['NAV.MY-DATATARGET', 'DATATARGET.SHOW-OPTIONS'])
      .subscribe((translations) => {
        this.backButton.label = translations['NAV.MY-DATATARGET'];
        this.dropdownButton.label = translations['DATATARGET.SHOW-OPTIONS'];
      });
    this.canEdit = this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.ApplicationWrite,
      undefined,
      appId
    );
  }

  getDatatarget(id: number) {
    this.datatargetService.get(id).subscribe((dataTarget: Datatarget) => {
      this.datatarget = dataTarget;
    });
  }

  onDeleteDatatarget() {
    this.deleteDialogSubscription = this.deleteDialogService
      .showSimpleDialog()
      .subscribe((response) => {
        if (response) {
          this.datatargetService.delete(this.datatarget.id).subscribe(() => {});
          this.location.back();
        }
      });
  }

  getDatatargetRelations(id: number) {
    this.datatargetRelationService.getByDataTarget(id).subscribe((response) => {
      this.dataTargetRelations = response.data;
    });
  }

  ngOnDestroy(): void {
    this.deleteDialogSubscription?.unsubscribe();
  }
}
