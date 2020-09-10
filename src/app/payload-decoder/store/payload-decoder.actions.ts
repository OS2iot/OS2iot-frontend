import { Action } from '@ngrx/store';
import { PayloadDecoder } from 'src/app/payload-decoder/payload-decoder.model';


export const SET_PAYLOADDECODERS = '[Payload Decoder] Set Payload Decoder';
export const FETCH_PAYLOADDECODER = '[Payload Decoder] Fetch Payload Decoder';
export const ADD_PAYLOADDECODER = '[Payload Decoder] Add Payload Decoder';
export const UPDATE_PAYLOADDECODER = '[Payload Decoder] Update Payload Decoder';
export const DELETE_PAYLOADDECODER = '[Payload Decoder] Delete Payload Decoder';
export const STORE_PAYLOADDECODERS = '[Payload Decoder] Store Payload Decoder';

export class SetPayloadDecoders implements Action {
    readonly type = SET_PAYLOADDECODERS;

    constructor(public payload: PayloadDecoder[]) { }
}

export class FetchPayloadDecoders implements Action {
    readonly type = FETCH_PAYLOADDECODER;
}

export class AddPayloadDecoder implements Action {
    readonly type = ADD_PAYLOADDECODER;

    constructor(public payloadDecoder: PayloadDecoder) { }
}

export class UpdatePayloadDecoder implements Action {
    readonly type = UPDATE_PAYLOADDECODER;

    constructor(public payload: { id: number; payloadDecoder: PayloadDecoder }) { }
}

export class DeletePayloadDecoder implements Action {
    readonly type = DELETE_PAYLOADDECODER;

    constructor(public payload: number) { }
}

export class StorePayloadDecoder implements Action {
    readonly type = STORE_PAYLOADDECODERS;
}

export type PayloadDecoderActions =
    | SetPayloadDecoders
    | FetchPayloadDecoders
    | AddPayloadDecoder
    | UpdatePayloadDecoder
    | DeletePayloadDecoder
    | StorePayloadDecoder;
