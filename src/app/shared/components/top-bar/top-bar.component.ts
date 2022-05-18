import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Sort } from '@shared/models/sort.model';
import { Router } from '@angular/router';
import { faSearch, faChevronLeft, faUser, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Application } from '@applications/application.model';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { BackButton } from '@shared/models/back-button.model';
import { QuickActionButton } from '@shared/models/quick-action-button.model';
import { OrganisationResponse } from '@app/admin/organisation/organisation.model';
import { Gateway } from '@app/gateway/gateway.model';
import { DatatargetResponse } from '@applications/datatarget/datatarget-response.model';
import { PayloadDecoder } from '@payload-decoder/payload-decoder.model';
import { PermissionResponse } from '@app/admin/permission/permission.model';
import { UserResponse } from '@app/admin/users/user.model';
import { DropdownButton } from '@shared/models/dropdown-button.model';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { AuthService } from '@auth/auth.service';
import { LoggedInService } from '@shared/services/loggedin.service';
import { environment } from '@environments/environment';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
    @Input() data: Application | IotDevice | DatatargetResponse | PayloadDecoder | Gateway | PermissionResponse | UserResponse | OrganisationResponse;
    @Input() buttons?: QuickActionButton[];
    @Input() backButton: BackButton;
    @Input() subPage: boolean;
    @Input()
    public subTitle: string;
    faChevronLeft = faChevronLeft;
    faQuestionCircle = faQuestionCircle
    faUser = faUser;

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

    faSearch = faSearch;

    constructor(
        public translate: TranslateService,
        private location: Location,
        private router: Router,
        private sharedVariableService: SharedVariableService,
        private authService: AuthService,
        private loggedInService: LoggedInService
    ) {
        translate.use('da');
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
            this.router.navigate(this.backButton.routerLink)
        } else if (this.backButton?.routerLink && typeof this.backButton.routerLink === 'string') {
            this.router.navigate([this.backButton.routerLink])
        } else {
            this.location.back();
        }
    }

    search(value: string): void {
        // Redirect to search results page and do search
        const urlEncoded = encodeURIComponent(value);

        if (value) {
            this.router.navigate(['/search'], { queryParams: { q: urlEncoded } });
        } else {
            this.decode('');
        }
    }

    decode(val: string): string {
        if (val === undefined) {
            return '';
        }
        return decodeURIComponent(val);
    }

    onClickDelete() {
        this.deleteSelectedInDropdown.emit();
    }

    onClickExtraDropdownOption(id: string) {
      this.extraDropdownOptions.emit(id);
    }

    public goToHelp() {
        window.open('https://os2iot.os2.eu/');
    }

    getUsername(): string {
        return this.sharedVariableService.getUsername();
    }

    onLogout() {
        this.authService.logout();
        this.router.navigateByUrl('auth');
        this.loggedInService.emitChange(false);
    }

    getKombitLogoutUrl() {
        const jwt = this.authService.getJwt();
        if (this.authService.isLoggedInWithKombit()) {
          return `${environment.baseUrl}auth/kombit/logout?secret_token=${jwt}`;
        } else {
          return '';
        }
      }

      isLoggedInWithKombit() {
        return this.authService.isLoggedInWithKombit();
      }

      hasEmail(): boolean {
          if (this.sharedVariableService.getUserInfo().user.email)
          {
              return true
          }
          else return false;
      }

      hasAnyPermission(): boolean {
          return this.sharedVariableService.getHasAnyPermission();
      }
}

