import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { TestPayloadDecoder } from './test-payload-decoder.model';

@Injectable({
    providedIn: 'root',
})
export class TestPayloadDecoderService {
    URL = 'test-payload-decoder';

    constructor(private restService: RestService) { }

    post(body: TestPayloadDecoder) {
        body.code = JSON.stringify(body.code);
        body.iotDeviceJsonString = JSON.stringify(body.iotDeviceJsonString);
        body.rawPayloadJsonString = JSON.stringify(body.rawPayloadJsonString);
        return this.restService.post(this.URL, body);
    }
}
