import { Injectable } from '@angular/core';
import { RestService } from '../shared/services/rest.service';
import { Observable } from 'rxjs';
import { PayloadDecoderResponse, PayloadDecoder, PayloadDecoderBodyResponse } from 'src/app/payload-decoder/payload-decoder.model';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Injectable({
    providedIn: 'root',
})
export class PayloadDecoderService {
    URL = 'payload-decoder';

    constructor(private restService: RestService, private sharedVariableService: SharedVariableService) { }

    post(body: PayloadDecoder): Observable<PayloadDecoderResponse> {
        if (!body.organizationID) {
            body.organizationID = this.sharedVariableService.getSelectedOrganisationId();
        }
        body.decodingFunction = JSON.stringify(body.decodingFunction);
        return this.restService.post(this.URL, body);
    }

    put(body: PayloadDecoder, id: number): Observable<PayloadDecoder> {
        body.decodingFunction = JSON.stringify(body.decodingFunction);
        return this.restService.put(this.URL, body, id, { observe: 'response' });
    }

    getOne(id: number): Observable<PayloadDecoderBodyResponse> {
        return this.restService.get(this.URL, {}, id);
    }

    getMultiple(): Observable<PayloadDecoderResponse> {
        return this.restService.get(this.URL);
    }

    delete(id: number) {
        return this.restService.delete(this.URL, id);
    }
}
