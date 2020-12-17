import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PayloadDeviceDatatargetGetByDataTarget } from '@app/payload-decoder/payload-device-data.model';
import { PayloadDeviceDatatargetService } from '@app/payload-decoder/payload-device-datatarget.service';
import { BackButton } from '@shared/models/back-button.model';
import { DatatargetService } from '../datatarget.service';
import { Location } from '@angular/common';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { Datatarget } from '../datatarget.model';
import { DropdownButton } from '@shared/models/dropdown-button.model';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';
import { IotDevice } from '@applications/iot-devices/iot-device.model';

@Component({
    selector: 'app-datatarget-detail',
    templateUrl: './datatarget-detail.component.html',
    styleUrls: ['./datatarget-detail.component.scss']
})
export class DatatargetDetailComponent implements OnInit, OnDestroy {

    public datatargetSubscription: Subscription;
    public datatarget: Datatarget;
    public backButton: BackButton = { label: '', routerLink: '/datatarget-list' };
    public dataTargetRelations: PayloadDeviceDatatargetGetByDataTarget[];
    private deleteDialogSubscription: Subscription;
    public dropdownButton: DropdownButton;
    arrowsAltH = faArrowsAltH;
    private applicationName: string;

    constructor(
        private route: ActivatedRoute,
        private deleteDialogService: DeleteDialogService,
        private location: Location,
        private datatargetRelationServicer: PayloadDeviceDatatargetService,
        private datatargetService: DatatargetService,
        public translate: TranslateService) { }

    ngOnInit(): void {
        const id: number = +this.route.snapshot.paramMap.get('datatargetId');
        this.applicationName = this.route.snapshot.paramMap.get('name');
        if (id) {
            this.getDatatarget(id);
            this.getDatatargetRelations(id);
            this.dropdownButton = {
                label: '',
                editRouterLink: '../../datatarget-edit/' + id,
                isErasable: true,
            }
        }
        this.translate.get(['NAV.MY-DATATARGET', 'DATATARGET.SHOW-OPTIONS'])
            .subscribe(translations => {
                this.backButton.label = translations['NAV.MY-DATATARGET'];
                this.dropdownButton.label = translations['DATATARGET.SHOW-OPTIONS']
            });
    }

    getDatatarget(id: number) {
        this.datatargetService.get(id)
            .subscribe((dataTarget: Datatarget) => {
                this.datatarget = dataTarget;
                this.setBackButton(this.datatarget.applicationId);
            });
    }

    private setBackButton(applicationId: number) {
        this.backButton.routerLink = ['applications', applicationId.toString(), 'datatarget-list', this.applicationName ]
    }

    onDeleteDatatarget() {
        this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(
            (response) => {
                if (response) {
                    this.datatargetService.delete(this.datatarget.id).subscribe((response) => {
                    });
                    this.location.back();
                } else {
                    console.log(response);
                }
            }
        );
    }

    getJoinedDeviceNames(element: IotDevice[]): string {
        return element.map(device => device.name).join(', ');
    }

    getDatatargetRelations(id: number) {
        this.datatargetRelationServicer.getByDataTarget(id)
            .subscribe((response) => {
                this.dataTargetRelations = response.data;
            });
    }

    ngOnDestroy(): void {
        if (this.deleteDialogSubscription) {
            this.deleteDialogSubscription.unsubscribe();
        }
    }

}
