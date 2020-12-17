import { Injectable } from '@angular/core';
import { RestService } from '../shared/services/rest.service';
import { Observable } from 'rxjs';
import { PayloadDecoderResponse, PayloadDecoder, PayloadDecoderBodyResponse, PayloadDecoderMappedResponse, GetPayloadDecoderParameters } from 'src/app/payload-decoder/payload-decoder.model';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { map } from 'rxjs/operators';
import { UserMinimalService } from '@app/admin/users/user-minimal.service';

@Injectable({
    providedIn: 'root',
})
export class PayloadDecoderService {
    URL = 'payload-decoder';

    constructor(
        private restService: RestService, 
        private sharedVariableService: SharedVariableService,
        private userMinimalService: UserMinimalService) { }

    post(body: PayloadDecoder): Observable<PayloadDecoderResponse> {
        body.organizationId = this.sharedVariableService.getSelectedOrganisationId();
        body.decodingFunction = JSON.stringify(body.decodingFunction);
        return this.restService.post(this.URL, body);
    }

    put(body: PayloadDecoder, id: number): Observable<PayloadDecoder> {
        body.decodingFunction = JSON.stringify(body.decodingFunction);
        return this.restService.put(this.URL, body, id, { observe: 'response' });
    }

    getOne(id: number): Observable<PayloadDecoder> {
        return this.restService.get(this.URL, {}, id)
            .pipe(
                map(
                    (response: PayloadDecoderBodyResponse) => {
                        const newModel: PayloadDecoder = {
                            name: response.name,
                            id: response.id,
                            organizationId: response.organization.id,
                            organizationName: response.organization.name,
                            createdAt: response.createdAt,
                            updatedAt: response.updatedAt,
                            createdBy: response.createdBy,
                            updatedBy: response.updatedBy,
                            createdByName: this.userMinimalService.getUserNameFrom(response.createdBy),
                            updatedByName: this.userMinimalService.getUserNameFrom(response.updatedBy),
                            decodingFunction: response.decodingFunction,
                            canEdit: false
                        }
                        return newModel;
                    }
                )
            );
    }

    getMultiple(
        limit: number,
        offset: number,
        sort: string,
        orderOn: string,
        organizationId?: number
    ): Observable<PayloadDecoderMappedResponse> {
        const params: GetPayloadDecoderParameters = {
            limit: limit,
            offset: offset,
            sort: sort,
            orderOn: orderOn
        };
        if (organizationId) {
            params.organizationId = organizationId
        }
        return this.restService.get(this.URL, params).pipe(
            map(
                (response: PayloadDecoderResponse) => {
                    const payloadDecoders = []
                    response.data.forEach(
                        (payoadeDecoder: PayloadDecoderBodyResponse) => {
                            const newModel: PayloadDecoder = {
                                name: payoadeDecoder.name,
                                id: payoadeDecoder.id,
                                organizationId: payoadeDecoder.organization.id,
                                organizationName: payoadeDecoder.organization.name,
                                createdAt: payoadeDecoder.createdAt,
                                updatedAt: payoadeDecoder.updatedAt,
                                createdBy: payoadeDecoder.createdBy,
                                updatedBy: payoadeDecoder.updatedBy,
                                createdByName: this.userMinimalService.getUserNameFrom(payoadeDecoder.createdBy),
                                updatedByName: this.userMinimalService.getUserNameFrom(payoadeDecoder.updatedBy),
                                decodingFunction: payoadeDecoder.decodingFunction,
                                canEdit: false
                            }
                            payloadDecoders.push(newModel)
                        }
                    )
                    return {
                        data: payloadDecoders,
                        count: response.count
                    }
                }
            )
        );
    }

    delete(id: number) {
        return this.restService.delete(this.URL, id);
    }
}
