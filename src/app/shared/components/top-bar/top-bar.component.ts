import { Location } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { OrganisationResponse } from "@app/admin/organisation/organisation.model";
import { PermissionResponse } from "@app/admin/permission/permission.model";
import { UserResponse } from "@app/admin/users/user.model";
import { Gateway } from "@app/gateway/gateway.model";
import { Application } from "@applications/application.model";
import { DatatargetResponse } from "@applications/datatarget/datatarget-response.model";
import { Datatarget } from "@applications/datatarget/datatarget.model";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { AuthService } from "@auth/auth.service";
import { environment } from "@environments/environment";
import { faChevronLeft, faQuestionCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import { TranslateService } from "@ngx-translate/core";
import { PayloadDecoder } from "@payload-decoder/payload-decoder.model";
import { BackButton } from "@shared/models/back-button.model";
import { DropdownButton } from "@shared/models/dropdown-button.model";
import { QuickActionButton } from "@shared/models/quick-action-button.model";
import { Sort } from "@shared/models/sort.model";
import { LoggedInService } from "@shared/services/loggedin.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.scss"],
})
export class TopBarComponent implements OnInit {
  @Input() data:
    | Application
    | IotDevice
    | DatatargetResponse
    | Datatarget
    | PayloadDecoder
    | Gateway
    | PermissionResponse
    | UserResponse
    | OrganisationResponse;
  @Input() buttons?: QuickActionButton[];
  @Input() backButton: BackButton;
  @Input() subPage: boolean;
  @Input()
  public subTitle: string;
  faChevronLeft = faChevronLeft;
  faQuestionCircle = faQuestionCircle;
  faUser = faUser;
  searchText: string = "";

  @Input() staticTitle: string;
  @Input() title: string;
  @Input() ctaLabel: string;
  @Input() ctaRouterLink: string;
  @Input() dtLabel: string;
  @Input() dtRouterLink: string;
  @Input() sort: Sort[];
  @Input() pageLimit: number;
  @Input() selectedSortId: number;
  @Input() component: false;
  @Input() showSelectedSort = true;
  @Input() backButtonTitle: string;
  @Input() searchQuery: string;
  @Output() selectedSortChange = new EventEmitter();
  @Output() updatePageLimit = new EventEmitter();

  @Output() deleteSelectedInDropdown = new EventEmitter();
  @Output() extraDropdownOptions = new EventEmitter();
  @Input() addDetailDowndown: boolean;
  @Input() dropDownButton: DropdownButton;
  @Input() canEdit = false;

  constructor(
    public translate: TranslateService,
    private location: Location,
    private router: Router,
    private sharedVariableService: SharedVariableService,
    private authService: AuthService,
    private loggedInService: LoggedInService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    translate.use("da");

    this.matIconRegistry.addSvgIcon(
      "plus-circle",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/images/plus-circle.svg"),
      {}
    );

    this.matIconRegistry.addSvgIcon(
      "angle-down",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/images/angle-down.svg"),
      {}
    );
  }

  ngOnInit(): void {
    if (this.data) {
      this.subTitle = this.data.name;
    }
  }

  changeSort(id: number) {
    this.selectedSortChange.emit(id);
  }

  routeTo(): void {
    if (this.backButton?.routerLink && Array.isArray(this.backButton.routerLink)) {
      this.router.navigate(this.backButton.routerLink);
    } else if (this.backButton?.routerLink && typeof this.backButton.routerLink === "string") {
      this.router.navigate([this.backButton.routerLink]);
    } else {
      this.location.back();
    }
  }

  search(value: string): void {
    this.searchText = value;
  }

  decode(val: string): string {
    if (val === undefined) {
      return "";
    }
    return decodeURIComponent(val);
  }

  onClickDelete() {
    this.deleteSelectedInDropdown.emit();
  }

  onClickExtraDropdownOption(id: string) {
    this.extraDropdownOptions.emit(id);
    const extraDropdownOption = this.dropDownButton.extraOptions.find(opt => opt.id === id);

    extraDropdownOption?.onClick();
  }

  public goToHelp() {
    window.open("https://os2iot.os2.eu/");
  }

  getUsername(): string {
    return this.sharedVariableService.getUsername();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl("auth");
    this.loggedInService.emitChange(false);
  }

  getKombitLogoutUrl() {
    const jwt = this.authService.getJwt();
    if (this.authService.isLoggedInWithKombit()) {
      return `${environment.baseUrl}auth/kombit/logout?secret_token=${jwt}`;
    } else {
      return "";
    }
  }

  isLoggedInWithKombit() {
    return this.authService.isLoggedInWithKombit();
  }

  hasEmail(): boolean {
    if (this.sharedVariableService.getUserInfo()?.user?.email) {
      return true;
    } else {
      return false;
    }
  }

  hasAnyPermission(): boolean {
    return this.sharedVariableService.getHasAnyPermission();
  }
}
