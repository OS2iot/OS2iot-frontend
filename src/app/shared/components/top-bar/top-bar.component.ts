import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Sort } from '@shared/models/sort.model';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Application } from '@applications/application.model';
import { Datatarget } from '@applications/datatarget/datatarget.model';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { BackButton } from '@shared/models/back-button.model';
import { QuickActionButton } from '@shared/models/quick-action-button.model';
import { Organisation, OrganisationResponse } from '@app/admin/organisation/organisation.model';
import { Gateway, GatewayResponse } from '@app/gateway/gateway.model';
import { OrganisationDetailComponent } from '@app/admin/organisation/organisation-detail/organisation-detail.component';
import { DatatargetResponse } from '@applications/datatarget/datatarget-response.model';
import { PayloadDecoder, PayloadDecoderResponse } from '@payload-decoder/payload-decoder.model';
import { PermissionResponse } from '@app/admin/permission/permission.model';
import { UserResponse } from '@app/admin/users/user.model';

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
    public subTitle: string;

    @Input() staticTitle: string;
    @Input() title: string;
    @Input() ctaLabel: string;
    @Input() ctaRouterLink: string;
    @Input() sort: Sort[];
    @Input() pageLimit: number;
    @Input() selectedSortId: number;
    @Input() component: false;
    @Input() showSelectedSort = true;
    @Input() backButtonTitle: string;
    @Input() searchQuery: string;
    @Output() selectedSortChange = new EventEmitter();
    @Output() updatePageLimit = new EventEmitter();
    faSearch = faSearch;

    constructor(
        public translate: TranslateService,
        private location: Location,
        private router: Router,
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

    routeBack(): void {
        this.location.back();
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

    // pageLimitUpdate(value) {
    //     console.log('page limit', value);
    //     this.updatePageLimit.emit(value);
    // }
}
