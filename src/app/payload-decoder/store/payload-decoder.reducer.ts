import * as PayloadDecoderActions from './payload-decoder.actions';
import { PayloadDecoder } from 'src/app/payload-decoder/payload-decoder.model';

export interface State {
    payloadDecoders: PayloadDecoder[];
}

const initialState: State = {
    payloadDecoders: []
};

export function payloadDecoderReducer(
    state = initialState,
    action: PayloadDecoderActions.PayloadDecoderActions
) {
    switch (action.type) {
        case PayloadDecoderActions.SET_PAYLOADDECODERS:
            return {
                ...state,
                payloadDecoders: [...action.payload],
            };
        case PayloadDecoderActions.ADD_PAYLOADDECODER:
            return {
                ...state,
                payloadDecoders: [...state.payloadDecoders, action.payloadDecoder]
            };
        case PayloadDecoderActions.UPDATE_PAYLOADDECODER:
            const updatedRecipe = {
                ...state.payloadDecoders[action.payload.id],
                ...action.payload.payloadDecoder
            };

            const updatedpayloadDecoders = [...state.payloadDecoders];
            updatedpayloadDecoders[action.payload.id] = updatedRecipe;

            return {
                ...state,
                payloadDecoders: updatedpayloadDecoders
            };
        case PayloadDecoderActions.DELETE_PAYLOADDECODER:
            return {
                ...state,
                payloadDecoders: state.payloadDecoders.filter((payloadDecoder, index) => {
                    return index !== action.payload;
                })
            };
        default:
            return state;
    }
}
