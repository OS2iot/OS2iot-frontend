import { Injectable } from "@angular/core";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { RestService } from "./rest.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class OpendatadkService {
    private OPENDATADKSHARINGURL = "open-data-dk-sharing";

    constructor(private restService: RestService, private sharedVariableService: SharedVariableService) {}

    get(): Observable<any> {
        const organizationId = this.sharedVariableService.getSelectedOrganisationId();
        return this.restService.get(this.OPENDATADKSHARINGURL, null, organizationId);
    }
}
