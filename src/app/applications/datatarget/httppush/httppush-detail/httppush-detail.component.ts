import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { PayloadDeviceDatatargetGetByDataTarget } from "@app/payload-decoder/payload-device-data.model";
import { PayloadDeviceDatatargetService } from "@app/payload-decoder/payload-device-datatarget.service";
import { BackButton } from "@shared/models/back-button.model";
import { DatatargetService } from "../../datatarget.service";
import { Location } from "@angular/common";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { Datatarget } from "../../datatarget.model";
import { DropdownButton } from "@shared/models/dropdown-button.model";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import { DatatargetDetail } from "@applications/datatarget/datatarget-detail/datatarget-detail";
import { MeService } from "@shared/services/me.service";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { DataTargetType } from "@shared/enums/datatarget-type";

@Component({
  selector: "app-httppush-detail",
  templateUrl: "./httppush-detail.component.html",
  styleUrls: ["./httppush-detail.component.scss"],
})
export class HttppushDetailComponent implements DatatargetDetail, OnInit, OnDestroy {
  dataTargetType = DataTargetType;

  public datatargetSubscription: Subscription;
  public datatarget: Datatarget;
  public backButton: BackButton = { label: "", routerLink: undefined };
  public dataTargetRelations: PayloadDeviceDatatargetGetByDataTarget[];
  private deleteDialogSubscription: Subscription;
  public dropdownButton: DropdownButton;
  arrowsAltH = faArrowsAltH;
  canEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private deleteDialogService: DeleteDialogService,
    private location: Location,
    private datatargetRelationServicer: PayloadDeviceDatatargetService,
    private datatargetService: DatatargetService,
    public translate: TranslateService,
    private meService: MeService
  ) {}

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get("datatargetId");
    const appId: number = +this.route.snapshot.paramMap.get("id");
    if (id) {
      this.getDatatarget(id);
      this.getDatatargetRelations(id);
      this.dropdownButton = {
        label: "",
        editRouterLink: "../../datatarget-edit/" + id,
        isErasable: true,
      };
    }
    this.translate.get(["NAV.MY-DATATARGET", "DATATARGET.SHOW-OPTIONS"]).subscribe(translations => {
      this.backButton.label = translations["NAV.MY-DATATARGET"];
      this.dropdownButton.label = translations["DATATARGET.SHOW-OPTIONS"];
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
    this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(response => {
      if (response) {
        this.datatargetService.delete(this.datatarget.id).subscribe(response => {});
        this.location.back();
      } else {
        console.log(response);
      }
    });
  }

  getDatatargetRelations(id: number) {
    this.datatargetRelationServicer.getByDataTarget(id).subscribe(response => {
      this.dataTargetRelations = response.data;
    });
  }

  ngOnDestroy(): void {
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }
}
