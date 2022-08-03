import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { Observable } from 'rxjs';
import { AdrAlgorithmResponse } from '@app/network-server/adr-algorithm.model';


@Injectable({
  providedIn: 'root'
})
export class NetworkServerService {
  URL = 'chirpstack/network-server';

  constructor(
    private restService: RestService) {}


  getAllAdrAlgorithms(): Observable<AdrAlgorithmResponse> {
    return this.restService.get(`${this.URL}/adr-algorithms`, {});
  }
}
