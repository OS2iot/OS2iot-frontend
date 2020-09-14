export class PayloadDecoder {
    public name: string;
    public decodingFunction: string;
    public id: number;
}

export interface PayloadDecoderResponse {
    data: PayloadDecoder[];
    count: number;
}